import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    balance: number;
    income: number;
    expense: number;
}

export default function Dashboard({ balance, income, expense }: DashboardProps) {
    const data = [
        { name: 'Income', value: income },
        { name: 'Expense', value: expense },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    {/* Card Saldo */}
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white dark:bg-gray-800 p-6 shadow-sm flex flex-col justify-center">
                        <h3 className="text-sm font-medium text-muted-foreground">Saldo</h3>
                        <p className="mt-2 text-2xl font-bold ">
                            {balance.toLocaleString('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                                minimumFractionDigits: 0,
                            })}
                        </p>
                    </div>

                    {/* Card Income */}
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white dark:bg-gray-800 p-6 shadow-sm flex flex-col justify-center">
                        <h3 className="text-sm font-medium text-muted-foreground">Total Income</h3>
                        <p className="mt-2 text-2xl font-bold text-green-600">
                            {income.toLocaleString('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                                minimumFractionDigits: 0,
                            })}
                        </p>
                    </div>

                    {/* Card Expense */}
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white dark:bg-gray-800 p-6 shadow-sm flex flex-col justify-center">
                        <h3 className="text-sm font-medium text-muted-foreground">Total Expense</h3>
                        <p className="mt-2 text-2xl font-bold text-red-600">
                            {expense.toLocaleString('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                                minimumFractionDigits: 0,
                            })}
                        </p>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border mt-4 bg-white dark:bg-gray-800 p-6">
                    <h3 className="text-lg font-semibold mb-4">Grafik Keuangan</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                            data={data}
                            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value: number) => `Rp ${value.toLocaleString()}`} />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#2563eb"
                                strokeWidth={3}
                                dot={{ r: 6 }}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </AppLayout>
    );
}
