<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\Api\CategoryController;

// Mengambil informasi pengguna yang sedang login
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Registrasi akun pengguna
Route::post('/register', [AuthController::class, 'register']);

// Login pengguna
Route::post('/login', [AuthController::class, 'login']);

// Mengambil statistik produk dan kategori
// Diletakkan sebelum apiResource agar tidak dianggap sebagai ID produk
Route::get('/products/stats', [ProductController::class, 'stats'])
    ->middleware('auth:sanctum');

// Menyediakan CRUD produk dengan autentikasi Sanctum
Route::apiResource('products', ProductController::class)
    ->middleware('auth:sanctum');

// Mengambil profil pengguna yang sedang login
Route::get('/profile', [AuthController::class, 'profile'])
    ->middleware('auth:sanctum');

// Logout pengguna
Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware('auth:sanctum');

// Menyediakan CRUD pengaduan dengan autentikasi Sanctum
Route::apiResource('complaints', ComplaintController::class)
    ->middleware('auth:sanctum');

// Menampilkan daftar kategori dengan autentikasi Sanctum
Route::get('/categories', [CategoryController::class, 'index'])
    ->middleware('auth:sanctum');