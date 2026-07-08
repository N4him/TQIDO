<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CarerBookingController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $carer = $request->user();
        abort_unless($carer && $this->resolveRole($carer) === 'carer', 403);

        $status = $request->query('estado');

        $query = Reserva::query()
            ->with([
                'customer:id,name,email,phone',
                'carerProfile:id,user_id,ciudad,direccion',
                'servicio:id,perfil_id,tipo,descripcion,precio_hora,precio_oferta,oferta_activa',
            ])
            ->where('carer_user_id', $carer->id)
            ->orderByDesc('fecha_servicio')
            ->orderByDesc('hora_inicio');

        if (filled($status)) {
            $query->where('estado', $status);
        }

        return response()->json([
            'data' => $query->paginate(15),
        ]);
    }

    public function accept(Request $request, Reserva $reserva): JsonResponse|RedirectResponse
    {
        $carer = $request->user();
        abort_unless($carer && $this->resolveRole($carer) === 'carer', 403);
        abort_unless($reserva->carer_user_id === $carer->id, 403);
        abort_unless($reserva->estado === Reserva::ESTADO_PENDIENTE, 422, 'Solo puedes aceptar reservas pendientes.');

        $reserva->update([
            'estado' => Reserva::ESTADO_ACEPTADA,
            'respondida_en' => now(),
            'motivo_rechazo' => null,
        ]);

        return $this->respond($request, [
            'message' => 'Reserva aceptada correctamente.',
            'data' => $reserva->fresh(),
        ]);
    }

    public function reject(Request $request, Reserva $reserva): JsonResponse|RedirectResponse
    {
        $carer = $request->user();
        abort_unless($carer && $this->resolveRole($carer) === 'carer', 403);
        abort_unless($reserva->carer_user_id === $carer->id, 403);
        abort_unless($reserva->estado === Reserva::ESTADO_PENDIENTE, 422, 'Solo puedes rechazar reservas pendientes.');

        $validated = $request->validate([
            'motivo_rechazo' => ['nullable', 'string', 'max:500'],
        ]);

        $reserva->update([
            'estado' => Reserva::ESTADO_RECHAZADA,
            'respondida_en' => now(),
            'motivo_rechazo' => $validated['motivo_rechazo'] ?? null,
        ]);

        return $this->respond($request, [
            'message' => 'Reserva rechazada correctamente.',
            'data' => $reserva->fresh(),
        ]);
    }

    public function start(Request $request, Reserva $reserva): JsonResponse|RedirectResponse
    {
        $carer = $request->user();
        abort_unless($carer && $this->resolveRole($carer) === 'carer', 403);
        abort_unless($reserva->carer_user_id === $carer->id, 403);
        abort_unless($reserva->estado === Reserva::ESTADO_ACEPTADA, 422, 'Solo puedes iniciar reservas aceptadas.');

        $reserva->update([
            'estado' => Reserva::ESTADO_EN_CURSO,
            'iniciada_en' => now(),
        ]);

        return $this->respond($request, [
            'message' => 'Reserva iniciada correctamente.',
            'data' => $reserva->fresh(),
        ]);
    }

    public function complete(Request $request, Reserva $reserva): JsonResponse|RedirectResponse
    {
        $carer = $request->user();
        abort_unless($carer && $this->resolveRole($carer) === 'carer', 403);
        abort_unless($reserva->carer_user_id === $carer->id, 403);
        abort_unless($reserva->estado === Reserva::ESTADO_EN_CURSO, 422, 'Solo puedes completar reservas en curso.');

        $reserva->update([
            'estado' => Reserva::ESTADO_COMPLETADA,
            'completada_en' => now(),
        ]);

        return $this->respond($request, [
            'message' => 'Reserva completada correctamente.',
            'data' => $reserva->fresh(),
        ]);
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
}
