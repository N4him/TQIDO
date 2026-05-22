<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class CarerController extends Controller
{
    public function profilePreview(): Response
    {
        return Inertia::render('profile/carer/carer');
    }

    public function dashboardPreview(): Response
    {
        return Inertia::render('dashboard/carer/dashboard');
    }

    public function agenda(): Response
    {
        return Inertia::render('dashboard/carer/agenda');
    }

    public function clientes(): Response
    {
        return Inertia::render('dashboard/carer/clientes');
    }
}
