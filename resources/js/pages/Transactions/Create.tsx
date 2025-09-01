import { useForm, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        type: "income",
        category: "",
        amount: "",
        description: "",
        date: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/transactions");
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Dashboard", href: "/dashboard" },
        { title: "Transaksi", href: "/transactions" },
        { title: "Tambah", href: "/transactions/create" },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Tambah Transaksi</h1>
                    <Link
                        href="/transactions"
                        className="inline-flex items-center px-4 py-2 bg-blue-700 text-white text-sm font-bold rounded-md shadow-sm hover:bg-gray-300"
                    >
                        Kembali
                    </Link>
                </div>

                {/* Form Card */}
                <div className="bg-white shadow-sm rounded-xl p-8 border">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Jenis Transaksi */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Jenis</label>
                            <select
                                value={data.type}
                                onChange={(e) => setData("type", e.target.value)}
                                className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2 text-sm"
                            >
                                <option value="income">Pemasukan</option>
                                <option value="expense">Pengeluaran</option>
                            </select>
                            {errors.type && (
                                <p className="text-red-500 text-xs mt-1">{errors.type}</p>
                            )}
                        </div>

                        {/* Kategori */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Kategori</label>
                            <input
                                type="text"
                                value={data.category}
                                onChange={(e) => setData("category", e.target.value)}
                                placeholder="Contoh: Makanan, Transportasi..."
                                className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2 text-sm"
                            />
                            {errors.category && (
                                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                            )}
                        </div>

                        {/* Jumlah */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Jumlah</label>
                            <input
                                type="number"
                                value={data.amount}
                                onChange={(e) => setData("amount", e.target.value)}
                                placeholder="0"
                                className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2 text-sm"
                            />
                            {errors.amount && (
                                <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
                            )}
                        </div>

                        {/* Tanggal */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Tanggal</label>
                            <input
                                type="date"
                                value={data.date}
                                onChange={(e) => setData("date", e.target.value)}
                                className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2 text-sm"
                            />
                            {errors.date && (
                                <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                            )}
                        </div>

                        {/* Keterangan */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Keterangan</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData("description", e.target.value)}
                                placeholder="Tambahkan catatan..."
                                rows={3}
                                className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2 text-sm"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-bold disabled:opacity-50"
                            >
                                {processing ? "Menyimpan..." : "Simpan"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
