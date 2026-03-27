<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// ✅ Landing page pública - Ruta principal
Route::get('/', function () {
    return Inertia::render('landing_page/Home', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// ✅ Preview temporal de dashboards (sin auth ni roles)
Route::get('/dashboard/carer', function () {
    return Inertia::render('dashboard/carer/dashboard');
})->name('dashboard.carer.preview');

Route::get('/dashboard/customer', function () {
    return Inertia::render('dashboard/customer/dashboard');
})->name('dashboard.customer.preview');

// ✅ Registros personalizados
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