<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CarerController extends Controller
{
    public function profilePreview(): Response
    {
        return Inertia::render('profile/carer/carer');
    }

    public function dashboardPreview(Request $request): Response
    {
        $carer = $request->user();

        $reservas = Reserva::query()
            ->with([
                'customer:id,name,email,phone',
                'servicio:id,tipo,descripcion',
            ])
            ->where('carer_user_id', $carer?->id)
            ->orderBy('fecha_servicio')
            ->orderBy('hora_inicio')
            ->get();

        $pendingRequests = $reservas
            ->where('estado', Reserva::ESTADO_PENDIENTE)
            ->values()
            ->map(fn (Reserva $reserva) => $this->mapPendingRequest($reserva))
            ->all();

        $nextServiceReservation = $reservas
            ->whereIn('estado', [Reserva::ESTADO_ACEPTADA, Reserva::ESTADO_EN_CURSO])
            ->filter(fn (Reserva $reserva) => $this->combineReservationDateTime($reserva)->gte(now()))
            ->first();

        $nextService = $nextServiceReservation
            ? $this->mapNextService($nextServiceReservation)
            : null;

        $todaySlots = $reservas
            ->filter(fn (Reserva $reserva) => $reserva->fecha_servicio?->isToday())
            ->values()
            ->map(fn (Reserva $reserva) => $this->mapTodaySlot($reserva))
            ->all();

        $todayEarnings = $reservas
            ->where('estado', Reserva::ESTADO_COMPLETADA)
            ->filter(fn (Reserva $reserva) => $reserva->fecha_servicio?->isToday())
            ->sum(fn (Reserva $reserva) => (float) $reserva->precio_total);

        $weekCompletedHours = $reservas
            ->where('estado', Reserva::ESTADO_COMPLETADA)
            ->filter(fn (Reserva $reserva) => $reserva->fecha_servicio?->betweenIncluded(now()->startOfWeek(), now()->endOfWeek()))
            ->sum(fn (Reserva $reserva) => (int) round(((int) $reserva->duracion_minutos) / 60));

        $pendingAmount = $reservas
            ->whereIn('estado', [Reserva::ESTADO_ACEPTADA, Reserva::ESTADO_EN_CURSO, Reserva::ESTADO_PENDIENTE])
            ->sum(fn (Reserva $reserva) => (float) $reserva->precio_total);

        return Inertia::render('dashboard/carer/dashboard', [
            'pendingRequests' => $pendingRequests,
            'nextService' => $nextService,
            'todaySlots' => $todaySlots,
            'carerStats' => [
                'today_earnings' => round($todayEarnings, 2),
                'today_services' => count($todaySlots),
                'pending_requests' => count($pendingRequests),
                'rating' => 4.9,
                'week_completed_hours' => $weekCompletedHours,
                'pending_amount' => round($pendingAmount, 2),
            ],
        ]);
    }

    public function agenda(): Response
    {
        return Inertia::render('dashboard/carer/agenda');
    }

    public function clientes(): Response
    {
        return Inertia::render('dashboard/carer/clientes');
    }

    private function mapPendingRequest(Reserva $reserva): array
    {
        $customerName = $reserva->customer?->name ?? 'Cliente';
        $start = $this->combineReservationDateTime($reserva);
        $end = $start->copy()->addMinutes((int) $reserva->duracion_minutos);

        return [
            'id' => $reserva->id,
            'av' => $this->initialsOf($customerName),
            'bg' => 'linear-gradient(135deg,#1a4a8a,#5a96d4)',
            'name' => $customerName,
            'type' => $this->serviceLabel($reserva).' · '.$this->humanDuration((int) $reserva->duracion_minutos),
            'price' => '€'.number_format((float) $reserva->precio_hora, 2),
            'hours' => $this->humanDuration((int) $reserva->duracion_minutos),
            'date' => $start->translatedFormat('D d M'),
            'time' => $start->format('H:i').' - '.$end->format('H:i'),
            'address' => $reserva->direccion_servicio,
            'notes' => $reserva->notas,
            'estado' => $reserva->estado,
        ];
    }

    private function mapNextService(Reserva $reserva): array
    {
        $customerName = $reserva->customer?->name ?? 'Cliente';
        $start = $this->combineReservationDateTime($reserva);

        return [
            'id' => $reserva->id,
            'time' => $start->format('H:i'),
            'date' => $start->translatedFormat('l d \\d\\e F'),
            'countdown_minutes' => max(0, now()->diffInMinutes($start, false)),
            'customer_name' => $customerName,
            'customer_initials' => $this->initialsOf($customerName),
            'customer_phone' => $reserva->customer?->phone,
            'customer_summary' => $this->serviceLabel($reserva),
            'service_description' => $reserva->servicio?->descripcion ?: 'Servicio confirmado',
            'duration' => $this->humanDuration((int) $reserva->duracion_minutos),
            'address' => $reserva->direccion_servicio,
            'notes' => $reserva->notas,
            'total' => round((float) $reserva->precio_total, 2),
            'status' => $reserva->estado,
        ];
    }

    private function mapTodaySlot(Reserva $reserva): array
    {
        $start = $this->combineReservationDateTime($reserva);
        $end = $start->copy()->addMinutes((int) $reserva->duracion_minutos);

        return [
            'id' => $reserva->id,
            'time' => $start->format('H:i').' - '.$end->format('H:i'),
            'name' => $reserva->customer?->name ?? 'Cliente',
            'type' => $this->serviceLabel($reserva).' · '.$this->humanDuration((int) $reserva->duracion_minutos),
            'status' => $reserva->estado === Reserva::ESTADO_PENDIENTE ? 'pending' : 'confirmed',
        ];
    }

    private function combineReservationDateTime(Reserva $reserva): Carbon
    {
        return Carbon::parse($reserva->fecha_servicio->format('Y-m-d').' '.$reserva->hora_inicio);
    }

    private function serviceLabel(Reserva $reserva): string
    {
        return match ($reserva->servicio?->tipo) {
            'adultos_mayores' => 'Adultos mayores',
            'ninos' => 'Niños',
            'mascotas' => 'Mascotas',
            default => 'Servicio',
        };
    }

    private function humanDuration(int $minutes): string
    {
        if ($minutes % 60 === 0) {
            $hours = (int) ($minutes / 60);
            return $hours.'h';
        }

        return $minutes.' min';
    }

    private function initialsOf(string $value): string
    {
        return collect(explode(' ', $value))
            ->filter()
            ->take(2)
            ->map(fn (string $part) => strtoupper(substr($part, 0, 1)))
            ->implode('') ?: 'CL';
    }
}
