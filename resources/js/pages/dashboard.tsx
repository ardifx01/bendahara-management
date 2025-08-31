import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

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
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid gap-4 md:grid-cols-3">
                    {/* Card Saldo */}
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white dark:bg-gray-800 p-6 shadow-sm flex flex-col justify-center">
                        <h3 className="text-sm font-medium text-muted-foreground">Saldo</h3>
                        <p className="mt-2 text-2xl font-bold ">
                            {balance.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </p>
                    </div>

                    {/* Card Total Income */}
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white dark:bg-gray-800 p-6 shadow-sm flex flex-col justify-center">
                        <h3 className="text-sm font-medium text-muted-foreground">Total Income</h3>
                        <p className="mt-2 text-2xl font-bold text-green-600">
                            {(Number(income)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </p>
                    </div>

                    {/* Card Total Expense */}
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white dark:bg-gray-800 p-6 shadow-sm flex flex-col justify-center">
                        <h3 className="text-sm font-medium text-muted-foreground">Total Expense</h3>
                        <p className="mt-2 text-2xl font-bold text-red-600">
                            {(Number(expense)).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </p>
                    </div>
                </div>

                {/* Main content placeholder */}
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border mt-4">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
