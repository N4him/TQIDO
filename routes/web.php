<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// ✅ Landing page pública - Ruta principal
Route::get('/', function () {
    return Inertia::render('index', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// ✅ Dashboard para usuarios autenticados
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        // TODO: Crear dashboard real cuando sea necesario
        // Por ahora redirige a la landing
        return Inertia::render('index', [
            'canRegister' => Features::enabled(Features::registration()),
        ]);
    })->name('dashboard');
});

require __DIR__.'/settings.php';