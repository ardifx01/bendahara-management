<?php

namespace App\Exports;

use App\Models\Transaction;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ReportsExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        return Transaction::selectRaw('
                YEAR(created_at) as year,
                MONTH(created_at) as month,
                SUM(CASE WHEN type="income" THEN amount ELSE 0 END) as total_income,
                SUM(CASE WHEN type="expense" THEN amount ELSE 0 END) as total_expense
            ')
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'desc')
            ->get();
    }

    public function headings(): array
    {
        return ['Tahun', 'Bulan', 'Total Income', 'Total Expense'];
    }
}
