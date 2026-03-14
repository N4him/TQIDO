<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// ✅ Landing page pública - Ruta principal
Route::get('/', function () {
    return Inertia::render('Home', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// ✅ Dashboard para usuarios autenticados
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        // TODO: Crear dashboard real cuando sea necesario
        return Inertia::render('Home', [
            'canRegister' => Features::enabled(Features::registration()),
        ]);
    })->name('dashboard');
});

// ✅ Registros personalizados
// ✅ Registros sin controlador
Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return Inertia::render('auth/login');
    })->name('login');

    Route::get('/register', function () {
        return Inertia::render('auth/register');
    })->name('register');

    Route::get('/register/customer', function () {
        return Inertia::render('auth/register_customer');
    })->name('register.customer');

    Route::get('/register/carer', function () {
        return Inertia::render('auth/register_carer');
    })->name('register.carer');
});

require __DIR__.'/settings.php';