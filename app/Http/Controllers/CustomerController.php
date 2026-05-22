<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    public function profilePreview(): Response
    {
        return Inertia::render('profile/costumer/costumer');
    }

    public function dashboardPreview(): Response
    {
        $serviceLabels = [
            'adultos_mayores' => 'Adultos mayores',
            'ninos' => 'Ninos',
            'mascotas' => 'Mascotas',
        ];

        $serviceCategories = [
            'adultos_mayores' => 'adultos',
            'ninos' => 'ninos',
            'mascotas' => 'mascotas',
        ];

        $dayLabels = [
            1 => 'Lunes',
            2 => 'Martes',
            3 => 'Miercoles',
            4 => 'Jueves',
            5 => 'Viernes',
            6 => 'Sabado',
            7 => 'Domingo',
        ];

        $photos = ['/assets/1.png', '/assets/2.png', '/assets/3.png', '/assets/4.png', '/assets/5.png'];

        $carers = Profile::query()
            ->with([
                'user',
                'disponibilidades',
                'servicios' => fn ($query) => $query
                    ->where('estado', 'activo')
                    ->whereNotNull('precio_hora'),
            ])
            ->whereHas('servicios', fn ($query) => $query
                ->where('estado', 'activo')
                ->whereNotNull('precio_hora'))
            ->get()
            ->values()
            ->map(function (Profile $profile, int $index) use ($dayLabels, $photos, $serviceCategories, $serviceLabels) {
                $services = $profile->servicios
                    ->map(function ($service) {
                        return [
                            'id' => $service->id,
                            'tipo' => $service->tipo,
                            'descripcion' => $service->descripcion,
                            'precio_hora' => $service->precio_hora !== null ? (float) $service->precio_hora : null,
                            'precio_oferta' => $service->precio_oferta !== null ? (float) $service->precio_oferta : null,
                            'oferta_activa' => (bool) $service->oferta_activa,
                        ];
                    })
                    ->values();

                $primaryService = $services->first();
                $serviceNames = $services
                    ->pluck('tipo')
                    ->map(fn ($tipo) => $serviceLabels[$tipo] ?? ucfirst(str_replace('_', ' ', (string) $tipo)))
                    ->values();

                $availability = $profile->disponibilidades
                    ->sortBy([
                        ['dia_semana', 'asc'],
                        ['hora_inicio', 'asc'],
                    ])
                    ->map(function ($slot) use ($dayLabels) {
                        return [
                            'day' => $dayLabels[(int) $slot->dia_semana] ?? 'Dia',
                            'day_index' => (int) $slot->dia_semana,
                            'start' => substr((string) $slot->hora_inicio, 0, 5),
                            'end' => substr((string) $slot->hora_fin, 0, 5),
                            'minimum_duration' => (int) ($slot->duracion_minima_minutos ?? 0),
                            'notice_hours' => (int) ($slot->aviso_previo_horas ?? 0),
                        ];
                    })
                    ->values();

                $name = $profile->user?->name ?? 'Cuidador/a';
                $location = collect([$profile->ciudad, $profile->direccion])
                    ->filter(fn ($value) => is_string($value) && trim($value) !== '')
                    ->implode(' · ');

                return [
                    'id' => $profile->id,
                    'photoUrl' => $photos[$index % count($photos)],
                    'name' => $name,
                    'initials' => $this->initialsOf($name),
                    'spec' => $serviceNames->isNotEmpty()
                        ? 'Cuidador/a de '.$serviceNames->join(' · ')
                        : 'Cuidador/a disponible',
                    'verified' => false,
                    'avail' => $profile->disponibilidades->isNotEmpty(),
                    'stars' => 5,
                    'reviews' => 0,
                    'cat' => $serviceCategories[$primaryService['tipo'] ?? ''] ?? 'adultos',
                    'services' => $services->all(),
                    'bio' => $profile->descripcion_general_servicio,
                    'city' => $profile->ciudad,
                    'address' => $profile->direccion,
                    'location' => $location,
                    'availability' => $availability->all(),
                    'active_days' => $availability->pluck('day_index')->unique()->count(),
                ];
            })
            ->all();

        return Inertia::render('dashboard/customer/dashboard', [
            'carers' => $carers,
        ]);
    }

    public function reservas(): Response
    {
        return Inertia::render('dashboard/customer/reservas');
    }

    public function favoritos(): Response
    {
        return Inertia::render('dashboard/customer/favoritos');
    }

    private function initialsOf(string $value): string
    {
        $initials = Collection::make(explode(' ', $value))
            ->filter()
            ->take(2)
            ->map(fn (string $part) => strtoupper(substr($part, 0, 1)))
            ->implode('');

        return $initials !== '' ? $initials : 'CU';
    }
}
