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

// ✅ Perfiles protegidos por autenticación y rol
Route::middleware(['auth', 'role:carer'])->group(function () {
    Route::get('/profile/carer', function () {
        return Inertia::render('profile/carer/carer');
    })->name('profile.carer.preview');
});

Route::middleware(['auth', 'role:customer'])->group(function () {
    Route::get('/profile/customer', function () {
        return Inertia::render('profile/costumer/costumer');
    })->name('profile.customer.preview');
});

Route::prefix('dashboard')->group(function () {
    Route::middleware(['auth', 'role:carer'])->prefix('carer')->group(function () {
        Route::get('/', function () {
            return Inertia::render('dashboard/carer/dashboard');
        })->name('dashboard.carer.preview');

        Route::get('/agenda', function () {
            return Inertia::render('dashboard/carer/agenda');
        })->name('dashboard.carer.agenda');

        Route::get('/clientes', function () {
            return Inertia::render('dashboard/carer/clientes');
        })->name('dashboard.carer.clientes');
    });

    Route::middleware(['auth', 'role:customer'])->prefix('customer')->group(function () {
        Route::get('/', function () {
            return Inertia::render('dashboard/customer/dashboard');
        })->name('dashboard.customer.preview');

        Route::get('/reservas', function () {
            return Inertia::render('dashboard/customer/reservas');
        })->name('dashboard.customer.reservas');

        Route::get('/favoritos', function () {
            return Inertia::render('dashboard/customer/favoritos');
        })->name('dashboard.customer.favoritos');
    });
});

Route::get('/profile/public', function () {
    return Inertia::render('profile_public/profile_carer');
})->name('profile.public');

// ✅ Registros personalizados
Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return Inertia::render('auth/login');
    })->name('login');
    Route::post('/login', [AuthController::class, 'webLogin'])->name('login.submit');

    Route::prefix('register')->group(function () {
        Route::get('/', function () {
            return Inertia::render('auth/register');
        })->name('register');

        Route::post('/', [AuthController::class, 'register'])->name('register.submit');

        Route::get('/customer', function () {
            return Inertia::render('auth/register_customer');
        })->name('register.customer');

        Route::get('/carer', function () {
            return Inertia::render('auth/register_carer');
        })->name('register.carer');

        Route::get('/social/{role}', [SocialController::class, 'completeRegistration'])
            ->name('register.social.complete');
    });
});



Route::get('/auth/{provider}', [SocialController::class, 'redirect'])->name('api.social.redirect');
Route::get('/auth/{provider}/callback', [SocialController::class, 'callback'])->name('api.social.callback');

require __DIR__ . '/settings.php';
