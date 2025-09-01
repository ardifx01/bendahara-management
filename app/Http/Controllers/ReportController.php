<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Exports\ReportsExport;
use Maatwebsite\Excel\Facades\Excel;

class ReportController extends Controller
{
    public function index()
    {
        // Group transaksi per bulan
        $reports = Transaction::selectRaw('
                YEAR(created_at) as year,
                MONTH(created_at) as month,
                SUM(CASE WHEN type="income" THEN amount ELSE 0 END) as total_income,
                SUM(CASE WHEN type="expense" THEN amount ELSE 0 END) as total_expense
            ')
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->get();

        return inertia('Reports/Index', [
            'reports' => $reports
        ]);
    }

    public function export()
    {
        return Excel::download(new ReportsExport, 'rekap_keuangan.xlsx');
    }

    public function transactionsByMonth($year, $month)
    {
        $transactions = \App\Models\Transaction::whereYear('created_at', $year)
            ->whereMonth('created_at', $month)
            ->selectRaw('id, DATE(created_at) as date, category, type, amount')
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($transactions);
    }

}
