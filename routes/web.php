<?php

use App\Http\Controllers\AuthController;
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
    Route::get('/carer', function () {
        return Inertia::render('profile/carer/carer');
    })->name('carer.preview');

    Route::get('/customer', function () {
        return Inertia::render('profile/costumer/costumer');
    })->name('customer.preview');

    Route::get('/public', function () {
        return Inertia::render('profile_public/profile_carer');
    })->name('public');
});

Route::prefix('dashboard')->name('dashboard.')->group(function () {
    Route::prefix('carer')->name('carer.')->group(function () {
        Route::get('/', function () {
            return Inertia::render('dashboard/carer/dashboard');
        })->name('preview');

        Route::get('/agenda', function () {
            return Inertia::render('dashboard/carer/agenda');
        })->name('agenda');

        Route::get('/clientes', function () {
            return Inertia::render('dashboard/carer/clientes');
        })->name('clientes');
    });

    Route::prefix('customer')->name('customer.')->group(function () {
        Route::get('/', function () {
            return Inertia::render('dashboard/customer/dashboard');
        })->name('preview');

        Route::get('/reservas', function () {
            return Inertia::render('dashboard/customer/reservas');
        })->name('reservas');

        Route::get('/favoritos', function () {
            return Inertia::render('dashboard/customer/favoritos');
        })->name('favoritos');
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
