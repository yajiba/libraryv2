<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\DepartmentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Auth/Loginv2', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('Dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/students', [StudentController::class, 'list'])->name('Students');
    Route::get('/students/datatable', [StudentController::class, 'datatable']);
    Route::post('/students/record', [StudentController::class, 'store']);
    Route::put('/students/{id}/update', [StudentController::class, 'update']);
    Route::get('/students/{id}/delete', [StudentController::class, 'update_status']);

    Route::get('/departments', [DepartmentController::class, 'list'])->name('Departments');
    Route::post('/department/record', [DepartmentController::class, 'store']);
    Route::put('/department/{id}/update', [DepartmentController::class, 'update']);
    Route::get('/department/datatable', [DepartmentController::class, 'datatable']);
    Route::get('/department/{id}/delete', [DepartmentController::class, 'update_status']);
});

require __DIR__.'/auth.php';
