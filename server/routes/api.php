<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [App\Http\Controllers\Api\AuthenticationController::class, 'register'])->name('register');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('doctors/specialities', function() {
    return App\Models\User::where('role_id', '2')->with('specialities')->get();
});