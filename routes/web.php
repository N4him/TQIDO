<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarerBookingController;
use App\Http\Controllers\CarerController;
use App\Http\Controllers\CustomerBookingController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\SocialController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('landing_page/Home', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::prefix('profile')->name('profile.')->group(function () {
    Route::middleware(['auth', 'role:carer'])->group(function () {
        Route::get('/carer', [CarerController::class, 'profilePreview'])->name('carer.preview');
    });

    Route::middleware(['auth', 'role:customer'])->group(function () {
        Route::get('/customer', [CustomerController::class, 'profilePreview'])->name('customer.preview');
    });

    Route::get('/public', function () {
        return Inertia::render('profile_public/profile_carer');
    })->name('public');
});

Route::prefix('dashboard')->name('dashboard.')->group(function () {
    Route::middleware(['auth', 'role:carer'])->prefix('carer')->name('carer.')->group(function () {
        Route::get('/', [CarerController::class, 'dashboardPreview'])->name('preview');
        Route::get('/agenda', [CarerController::class, 'agenda'])->name('agenda');
        Route::get('/clientes', [CarerController::class, 'clientes'])->name('clientes');
        Route::get('/solicitudes', [CarerBookingController::class, 'index'])->name('solicitudes.index');
        Route::patch('/solicitudes/{reserva}/aceptar', [CarerBookingController::class, 'accept'])->name('solicitudes.accept');
        Route::patch('/solicitudes/{reserva}/rechazar', [CarerBookingController::class, 'reject'])->name('solicitudes.reject');
        Route::patch('/solicitudes/{reserva}/iniciar', [CarerBookingController::class, 'start'])->name('solicitudes.start');
        Route::patch('/solicitudes/{reserva}/completar', [CarerBookingController::class, 'complete'])->name('solicitudes.complete');
    });

    Route::middleware(['auth', 'role:customer'])->prefix('customer')->name('customer.')->group(function () {
        Route::get('/', [CustomerController::class, 'dashboardPreview'])->name('preview');
        Route::get('/reservas', [CustomerController::class, 'reservas'])->name('reservas');
        Route::get('/favoritos', [CustomerController::class, 'favoritos'])->name('favoritos');
        Route::get('/reservas/data', [CustomerBookingController::class, 'index'])->name('reservas.index');
        Route::post('/reservas', [CustomerBookingController::class, 'store'])->name('reservas.store');
        Route::patch('/reservas/{reserva}/cancelar', [CustomerBookingController::class, 'cancel'])->name('reservas.cancel');
    });
});

Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return Inertia::render('auth/login');
    })->name('login');

    Route::post('/login', [AuthController::class, 'webLogin'])->name('login.submit');

    Route::prefix('register')->name('register.')->group(function () {
        Route::get('/', function () {
            return Inertia::render('auth/register');
        })->name('');

        Route::post('/', [AuthController::class, 'register'])->name('submit');

        Route::get('/customer', function () {
            return Inertia::render('auth/register_customer');
        })->name('customer');

        Route::get('/carer', function () {
            return Inertia::render('auth/register_carer');
        })->name('carer');

        Route::get('/social/{role}', [SocialController::class, 'completeRegistration'])
            ->name('social.complete');
    });
});

Route::prefix('auth')->name('api.social.')->group(function () {
    Route::get('/{provider}', [SocialController::class, 'redirect'])->name('redirect');
    Route::get('/{provider}/callback', [SocialController::class, 'callback'])->name('callback');
});

require __DIR__ . '/settings.php';
