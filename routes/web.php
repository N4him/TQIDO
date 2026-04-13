<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SocialController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// ✅ Landing page pública - Ruta principal
Route::get('/', function () {
    return Inertia::render('landing_page/Home', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// ✅ Perfiles públicos (sin auth)
Route::get('/profile/carer', function () {
    return Inertia::render('profile/carer/carer');
})->name('profile.carer.preview');

Route::get('/profile/customer', function () {
    return Inertia::render('profile/costumer/costumer');
})->name('profile.customer.preview');

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
    Route::post('/login', [AuthController::class, 'webLogin'])->name('login.submit');

    Route::get('/register', function () {
        return Inertia::render('auth/register');
    })->name('register');
    Route::post('/register', [AuthController::class, 'register'])->name('register.submit');

    Route::get('/register/customer', function () {
        return Inertia::render('auth/register_customer');
    })->name('register.customer');

    Route::get('/register/carer', function () {
        return Inertia::render('auth/register_carer');
    })->name('register.carer');
});

Route::get('/auth/{provider}', [SocialController::class, 'redirect'])->name('api.social.redirect');
Route::get('/auth/{provider}/callback', [SocialController::class, 'callback'])->name('api.social.callback');

require __DIR__.'/settings.php';