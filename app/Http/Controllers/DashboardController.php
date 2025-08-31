<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Transaction;

class DashboardController extends Controller
{
    public function index()
    {
        $income = Transaction::where('type', 'income')->sum('amount');
        $expense = Transaction::where('type', 'expense')->sum('amount');

        $balance = $income - $expense;

        return Inertia::render('dashboard', [
            'balance' => $balance,
            'income' => $income,
            'expense' => $expense,
        ]);
    }
}
