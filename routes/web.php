<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ReportController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard menggunakan controller
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Resource transaksi
    Route::resource('transactions', TransactionController::class);

    // Laporan
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
    Route::get('/reports/export', [ReportController::class, 'export'])->name('reports.export');
    Route::get('/reports/{year}/{month}/transactions', [ReportController::class, 'transactionsByMonth']);

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
