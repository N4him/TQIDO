<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SocialController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login'])->name('api.login');
Route::post('/create-profile', [AuthController::class, 'createProfile'])->name('api.createProfile');
Route::put('/update-profile', [AuthController::class, 'updateProfile'])->name('api.updateProfile');
Route::post('/logout', [AuthController::class, 'logout'])->name('api.logout')->middleware('auth:sanctum');
