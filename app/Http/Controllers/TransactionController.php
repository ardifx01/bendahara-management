<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::latest()->get();
        return Inertia::render('Transactions/Index', [
            'transactions' => $transactions,
        ]);
    }

    public function create()
    {
        return Inertia::render('Transactions/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|in:income,expense',
            'category' => 'nullable|string',
            'amount' => 'required|numeric',
            'description' => 'nullable|string',
            'date' => 'required|date',
        ]);

        Transaction::create($request->all());

        return redirect()->route('transactions.index')->with('success', 'Transaksi berhasil ditambahkan');
    }

    public function destroy(Transaction $transaction)
    {
        $transaction->delete();
        return redirect()->route('transactions.index')->with('success', 'Transaksi berhasil dihapus');
    }
}
