<?php

namespace App\Http\Controllers;

use App\Models\Profile;
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
            'ninos' => 'NiÃ±os',
            'mascotas' => 'Mascotas',
        ];

        $serviceCategories = [
            'adultos_mayores' => 'adultos',
            'ninos' => 'ninos',
            'mascotas' => 'mascotas',
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
            ->map(function (Profile $profile, int $index) use ($serviceLabels, $serviceCategories, $photos) {
                $services = $profile->servicios
                    ->map(function ($service) {
                        return [
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

                return [
                    'id' => $profile->id,
                    'photoUrl' => $photos[$index % count($photos)],
                    'name' => $profile->user?->name ?? 'Cuidador/a',
                    'spec' => $serviceNames->isNotEmpty()
                        ? 'Cuidador/a de ' . $serviceNames->join(' Â· ')
                        : 'Cuidador/a disponible',
                    'verified' => false,
                    'avail' => $profile->disponibilidades->isNotEmpty(),
                    'stars' => 5,
                    'reviews' => 0,
                    'cat' => $serviceCategories[$primaryService['tipo'] ?? ''] ?? 'adultos',
                    'services' => $services->all(),
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
}
