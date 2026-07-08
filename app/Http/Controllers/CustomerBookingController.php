<?php

namespace App\Http\Controllers;

use App\Models\DisponibilidadPerfil;
use App\Models\Profile;
use App\Models\Reserva;
use App\Models\ServicioPerfil;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CustomerBookingController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $customer = $request->user();
        abort_unless($customer && $this->resolveRole($customer) === 'customer', 403);

        $status = $request->query('estado');

        $query = Reserva::query()
            ->with([
                'carer:id,name,email,phone',
                'carerProfile:id,user_id,ciudad,direccion',
                'servicio:id,perfil_id,tipo,descripcion,precio_hora,precio_oferta,oferta_activa',
            ])
            ->where('customer_user_id', $customer->id)
            ->orderByDesc('fecha_servicio')
            ->orderByDesc('hora_inicio');

        if (filled($status)) {
            $query->where('estado', $status);
        }

        return response()->json([
            'data' => $query->paginate(15),
        ]);
    }

    public function store(Request $request): JsonResponse|RedirectResponse
    {
        $customer = $request->user();
        abort_unless($customer && $this->resolveRole($customer) === 'customer', 403);

        $validated = $request->validate([
            'carer_profile_id' => ['required', 'integer', 'exists:profiles,id'],
            'servicio_perfil_id' => ['required', 'integer', 'exists:servicios_perfil,id'],
            'fecha_servicio' => ['required', 'date', 'after_or_equal:today'],
            'hora_inicio' => ['required', 'date_format:H:i'],
            'duracion_minutos' => ['required', 'integer', 'min:30', 'max:1440'],
            'direccion_servicio' => ['required', 'string', 'max:255'],
            'notas' => ['nullable', 'string', 'max:1000'],
        ]);

        $customer->loadMissing('profile');
        $this->ensure($customer->profile !== null, 'booking', 'Debes completar tu perfil antes de reservar.');

        $carerProfile = Profile::query()
            ->with([
                'user',
                'disponibilidades',
                'servicios' => fn ($query) => $query->where('estado', 'activo'),
            ])
            ->findOrFail($validated['carer_profile_id']);

        $carer = $carerProfile->user;
        $this->ensure($carer !== null, 'booking', 'El cuidador seleccionado no tiene un usuario asociado.');
        $this->ensure($this->resolveRole($carer) === 'carer', 'booking', 'El perfil seleccionado no pertenece a un cuidador.');
        $this->ensure($carer->id !== $customer->id, 'booking', 'No puedes reservar tus propios servicios.');

        /** @var ServicioPerfil|null $servicio */
        $servicio = $carerProfile->servicios
            ->firstWhere('id', (int) $validated['servicio_perfil_id']);

        $this->ensure($servicio !== null, 'servicio_perfil_id', 'El servicio seleccionado no pertenece al cuidador o no esta activo.');
        $this->ensure($servicio->precio_hora !== null, 'servicio_perfil_id', 'El servicio seleccionado no tiene precio configurado.');

        $requestedStart = Carbon::createFromFormat(
            'Y-m-d H:i',
            $validated['fecha_servicio'].' '.$validated['hora_inicio']
        );
        $requestedEnd = (clone $requestedStart)->addMinutes((int) $validated['duracion_minutos']);

        $this->ensure($requestedStart->gt(now()), 'fecha_servicio', 'La fecha y hora de la reserva debe ser futura.');

        $availability = $this->resolveMatchingAvailability(
            $carerProfile->disponibilidades->all(),
            $requestedStart,
            $requestedEnd,
            (int) $validated['duracion_minutos']
        );

        $this->ensure(
            $availability !== null,
            'hora_inicio',
            $this->buildAvailabilityMessage(
                $carerProfile->disponibilidades->all(),
                $requestedStart,
                $requestedEnd,
                (int) $validated['duracion_minutos']
            )
        );

        $this->ensureNoConflictForCarer($carerProfile->id, $validated['fecha_servicio'], $validated['hora_inicio'], $requestedEnd->format('H:i:s'));
        $this->ensureNoConflictForCustomer($customer->id, $validated['fecha_servicio'], $validated['hora_inicio'], $requestedEnd->format('H:i:s'));

        $precioHora = $servicio->oferta_activa && $servicio->precio_oferta !== null
            ? (float) $servicio->precio_oferta
            : (float) $servicio->precio_hora;

        $precioTotal = round(($precioHora / 60) * (int) $validated['duracion_minutos'], 2);

        $reserva = Reserva::create([
            'customer_user_id' => $customer->id,
            'carer_user_id' => $carer->id,
            'carer_profile_id' => $carerProfile->id,
            'servicio_perfil_id' => $servicio->id,
            'fecha_servicio' => $validated['fecha_servicio'],
            'hora_inicio' => $requestedStart->format('H:i:s'),
            'hora_fin' => $requestedEnd->format('H:i:s'),
            'duracion_minutos' => (int) $validated['duracion_minutos'],
            'direccion_servicio' => $validated['direccion_servicio'],
            'notas' => $validated['notas'] ?? null,
            'precio_hora' => $precioHora,
            'precio_total' => $precioTotal,
            'estado' => Reserva::ESTADO_PENDIENTE,
        ]);

        $reserva->load([
            'carer:id,name,email,phone',
            'carerProfile:id,user_id,ciudad,direccion',
            'servicio:id,perfil_id,tipo,descripcion,precio_hora,precio_oferta,oferta_activa',
        ]);

        return $this->respond(
            $request,
            [
                'message' => 'Solicitud enviada correctamente.',
                'data' => $reserva,
            ]
        );
    }

    public function cancel(Request $request, Reserva $reserva): JsonResponse|RedirectResponse
    {
        $customer = $request->user();
        abort_unless($customer && $this->resolveRole($customer) === 'customer', 403);
        abort_unless($reserva->customer_user_id === $customer->id, 403);
        abort_unless(
            in_array($reserva->estado, [Reserva::ESTADO_PENDIENTE, Reserva::ESTADO_ACEPTADA], true),
            422,
            'Solo puedes cancelar reservas pendientes o aceptadas.'
        );

        $validated = $request->validate([
            'motivo_cancelacion' => ['nullable', 'string', 'max:500'],
        ]);

        $reserva->update([
            'estado' => Reserva::ESTADO_CANCELADA,
            'cancelada_en' => now(),
            'motivo_cancelacion' => $validated['motivo_cancelacion'] ?? null,
        ]);

        return $this->respond($request, [
            'message' => 'Reserva cancelada correctamente.',
            'data' => $reserva->fresh(),
        ]);
    }

    private function resolveMatchingAvailability(array $availabilities, Carbon $requestedStart, Carbon $requestedEnd, int $durationMinutes): ?DisponibilidadPerfil
    {
        $dayOfWeek = $requestedStart->dayOfWeekIso;

        foreach ($availabilities as $availability) {
            if ((int) $availability->dia_semana !== $dayOfWeek) {
                continue;
            }

            $availabilityStart = Carbon::createFromFormat('Y-m-d H:i:s', $requestedStart->format('Y-m-d').' '.$availability->hora_inicio);
            $availabilityEnd = Carbon::createFromFormat('Y-m-d H:i:s', $requestedStart->format('Y-m-d').' '.$availability->hora_fin);

            if ($requestedStart->lt($availabilityStart) || $requestedEnd->gt($availabilityEnd)) {
                continue;
            }

            if ($availability->duracion_minima_minutos && $durationMinutes < (int) $availability->duracion_minima_minutos) {
                continue;
            }

            if ($availability->aviso_previo_horas && now()->diffInHours($requestedStart, false) < (int) $availability->aviso_previo_horas) {
                continue;
            }

            return $availability;
        }

        return null;
    }

    private function buildAvailabilityMessage(
        array $availabilities,
        Carbon $requestedStart,
        Carbon $requestedEnd,
        int $durationMinutes
    ): string
    {
        $sameDayAvailabilities = collect($availabilities)
            ->filter(fn (DisponibilidadPerfil $availability) => (int) $availability->dia_semana === $requestedStart->dayOfWeekIso)
            ->sortBy('hora_inicio')
            ->values();

        if ($sameDayAvailabilities->isEmpty()) {
            return 'El cuidador no tiene disponibilidad configurada para ese día.';
        }

        $ranges = $sameDayAvailabilities
            ->map(fn (DisponibilidadPerfil $availability) => $this->formatHourRange($availability->hora_inicio, $availability->hora_fin))
            ->implode(', ');

        foreach ($sameDayAvailabilities as $availability) {
            $availabilityStart = Carbon::createFromFormat('Y-m-d H:i:s', $requestedStart->format('Y-m-d').' '.$availability->hora_inicio);
            $availabilityEnd = Carbon::createFromFormat('Y-m-d H:i:s', $requestedStart->format('Y-m-d').' '.$availability->hora_fin);

            if ($requestedStart->lt($availabilityStart) || $requestedEnd->gt($availabilityEnd)) {
                continue;
            }

            if ($availability->duracion_minima_minutos && $durationMinutes < (int) $availability->duracion_minima_minutos) {
                return 'La duracion seleccionada no coincide con la disponibilidad del cuidador. '
                    .'Horario disponible para ese dia: '.$ranges.'. '
                    .'La duracion minima para este bloque es de '.$availability->duracion_minima_minutos.' minutos.';
            }

            if ($availability->aviso_previo_horas && now()->diffInHours($requestedStart, false) < (int) $availability->aviso_previo_horas) {
                return 'La solicitud no cumple con el aviso previo del cuidador. '
                    .'Horario disponible para ese dia: '.$ranges.'. '
                    .'Debes reservar con al menos '.$availability->aviso_previo_horas.' horas de anticipacion.';
            }
        }

        return 'El horario solicitado no coincide con la disponibilidad del cuidador. '
            .'Horario disponible para ese dia: '.$ranges.'.';
    }

    private function formatHourRange(string $startTime, string $endTime): string
    {
        return Carbon::createFromFormat('H:i:s', $startTime)->format('H:i')
            .' - '.
            Carbon::createFromFormat('H:i:s', $endTime)->format('H:i');
    }

    private function ensureNoConflictForCarer(int $carerProfileId, string $date, string $startTime, string $endTime): void
    {
        $hasConflict = Reserva::query()
            ->where('carer_profile_id', $carerProfileId)
            ->whereDate('fecha_servicio', $date)
            ->whereIn('estado', [
                Reserva::ESTADO_PENDIENTE,
                Reserva::ESTADO_ACEPTADA,
                Reserva::ESTADO_EN_CURSO,
            ])
            ->where('hora_inicio', '<', $endTime)
            ->where('hora_fin', '>', $startTime)
            ->exists();

        $this->ensure(! $hasConflict, 'hora_inicio', 'El cuidador ya tiene una reserva en ese horario.');
    }

    private function ensureNoConflictForCustomer(int $customerId, string $date, string $startTime, string $endTime): void
    {
        $hasConflict = Reserva::query()
            ->where('customer_user_id', $customerId)
            ->whereDate('fecha_servicio', $date)
            ->whereIn('estado', [
                Reserva::ESTADO_PENDIENTE,
                Reserva::ESTADO_ACEPTADA,
                Reserva::ESTADO_EN_CURSO,
            ])
            ->where('hora_inicio', '<', $endTime)
            ->where('hora_fin', '>', $startTime)
            ->exists();

        $this->ensure(! $hasConflict, 'hora_inicio', 'Ya tienes otra reserva en ese horario.');
    }

    private function resolveRole(User $user): string
    {
        if (in_array($user->role, ['customer', 'carer'], true)) {
            return $user->role;
        }

        return $user->specialty === 'Cliente' ? 'customer' : 'carer';
    }

    private function respond(Request $request, array $payload): JsonResponse|RedirectResponse
    {
        if ($request->expectsJson()) {
            return response()->json($payload);
        }

        return back()->with('status', $payload['message']);
    }

    private function ensure(bool $condition, string $field, string $message): void
    {
        if (! $condition) {
            throw ValidationException::withMessages([
                $field => $message,
            ]);
        }
    }
}
