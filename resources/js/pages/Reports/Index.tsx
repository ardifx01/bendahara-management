import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

interface Report {
    year: number;
    month: number;
    total_income: number;
    total_expense: number;
}

interface Transaction {
    id: number;
    date: string;
    category: string;
    type: "income" | "expense";
    amount: number;
}

interface Props {
    reports: Report[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/' },
    { title: 'Laporan', href: '/reports' },
];

export default function Reports({ reports }: Props) {
    const [open, setOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(false);

    const months = [
        '', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const handleRowClick = async (report: Report) => {
        setSelectedReport(report);
        setOpen(true);
        setLoading(true);

        try {
            const res = await fetch(`/reports/${report.year}/${report.month}/transactions`);
            const data = await res.json();
            setTransactions(data);
        } catch (err) {
            console.error("Gagal fetch transaksi", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Rekap Laporan" />

            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Rekap Laporan Bulanan</h1>
                    <Button asChild className="bg-green-600 hover:bg-green-700">
                        <a href="/reports/export">Export Excel</a>
                    </Button>
                </div>

                {/* Table Section */}
                <Card className="overflow-hidden border">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">Detail Rekap</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tahun</TableHead>
                                    <TableHead>Bulan</TableHead>
                                    <TableHead className="text-right">Total Income</TableHead>
                                    <TableHead className="text-right">Total Expense</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reports.length > 0 ? (
                                    reports.map((r, i) => (
                                        <TableRow
                                            key={i}
                                            className="cursor-pointer hover:bg-gray-50"
                                            onClick={() => handleRowClick(r)}
                                        >
                                            <TableCell>{r.year}</TableCell>
                                            <TableCell>{months[r.month]}</TableCell>
                                            <TableCell className="text-right font-semibold text-green-600">
                                                Rp {r.total_income.toLocaleString('id-ID')}
                                            </TableCell>
                                            <TableCell className="text-right font-semibold text-red-600">
                                                Rp {r.total_expense.toLocaleString('id-ID')}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                                            Tidak ada data laporan
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>
                            {selectedReport
                                ? `Detail Transaksi - ${months[selectedReport.month]} ${selectedReport.year}`
                                : "Detail Transaksi"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="mt-4">
                        {loading ? (
                            <p className="text-center py-6">Loading...</p>
                        ) : transactions.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Tanggal</TableHead>
                                        <TableHead>Kategori</TableHead>
                                        <TableHead className="text-right">Tipe</TableHead>
                                        <TableHead className="text-right">Nominal</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions.map((t) => (
                                        <TableRow key={t.id}>
                                            <TableCell>{t.date}</TableCell>
                                            <TableCell>{t.category}</TableCell>
                                            <TableCell className="text-right capitalize">{t.type}</TableCell>
                                            <TableCell
                                                className={`text-right font-semibold ${t.type === "income"
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                                    }`}
                                            >
                                                Rp {t.amount.toLocaleString('id-ID')}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p className="text-center text-muted-foreground py-6">
                                Tidak ada transaksi untuk bulan ini
                            </p>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
