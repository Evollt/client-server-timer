<?php

use App\Http\Controllers\TimerController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(UserController::class)->prefix('user')->group(function () {
    Route::middleware(['guest'])->group(function () {
        Route::post('register', 'register');
        Route::post('login', 'login');
        Route::post('refresh', 'refresh');
    });

    Route::middleware(['auth'])->group(function () {
        Route::get('me', 'me');
        Route::post('logout', 'logout');
    });
});

Route::controller(TimerController::class)->middleware(['auth'])->prefix('timer')->group(function () {
    Route::post('create', 'create');
    // Route::post('update/{id}', 'update');
    Route::get('getAll', 'getAll');
    Route::delete('delete/{id}', 'delete');
});
