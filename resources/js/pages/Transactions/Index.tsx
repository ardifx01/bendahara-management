import { Link, usePage } from "@inertiajs/react";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import AppLayout from "@/layouts/app-layout";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { type BreadcrumbItem } from "@/types";

interface Transaction {
    id: number;
    type: "income" | "expense";
    category: string | null;
    amount: string;
    description: string | null;
    date: string;
}

interface TransactionPageProps extends InertiaPageProps {
    transactions: Transaction[];
}

export default function Index() {
    const { transactions } = usePage<TransactionPageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Dashboard", href: "/dashboard" },
        { title: "Transaksi", href: "/transactions" },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                        Daftar Transaksi
                    </h1>
                    <Link
                        href="/transactions/create"
                        className="bg-blue-600 text-white px-5 py-2 shadow hover:bg-blue-700 transition font-bold rounded-2xl"
                    >
                        Tambah Transaksi
                    </Link>
                </div>

                {/* Table Card */}
                <div className="bg-white dark:bg-gray-800 shadow-lg overflow-x-auto border border-gray-200 dark:border-gray-700">
                    <Table className="min-w-[800px]">
                        <TableHeader className="bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600">
                            <TableRow>
                                <TableHead className="py-3">Jenis</TableHead>
                                <TableHead className="w-[180px] py-3">Tanggal</TableHead>
                                <TableHead className="py-3">Kategori</TableHead>
                                <TableHead className="py-3">Jumlah</TableHead>
                                <TableHead className="py-3">Keterangan</TableHead>
                                <TableHead className="py-3">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.length > 0 ? (
                                transactions.map((t) => (
                                    <TableRow
                                        key={t.id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                    >
                                        <TableCell className="py-3">
                                            <span
                                                className={`px-3 py-1 text-sm font-bold rounded-2xl ${t.type === "income"
                                                        ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200"
                                                        : "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-200"
                                                    }`}
                                            >
                                                {t.type === "income"
                                                    ? "Pemasukan"
                                                    : "Pengeluaran"}
                                            </span>
                                        </TableCell>
                                        <TableCell className="font-medium text-gray-700 dark:text-gray-200 py-3">
                                            {new Date(t.date).toLocaleDateString("id-ID")}
                                        </TableCell>
                                        <TableCell className="text-gray-600 dark:text-gray-300 py-3">
                                            {t.category ?? "-"}
                                        </TableCell>
                                        <TableCell className="font-semibold text-gray-800 dark:text-gray-100 py-3">
                                            Rp{" "}
                                            {Number(t.amount).toLocaleString("id-ID", {
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                            })}
                                        </TableCell>
                                        <TableCell className="text-gray-600 dark:text-gray-300 py-3">
                                            {t.description ?? "-"}
                                        </TableCell>
                                        <TableCell className="py-3">
                                            <form method="POST" action={`/transactions/${t.id}`}>
                                                <input
                                                    type="hidden"
                                                    name="_method"
                                                    value="DELETE"
                                                />
                                                <button className="bg-red-600 rounded-2xl  text-white px-3 py-1 shadow hover:bg-red-700 transition text-sm font-bold">
                                                    Hapus
                                                </button>
                                            </form>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="text-center text-gray-500 dark:text-gray-400 py-6"
                                    >
                                        Belum ada transaksi
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
