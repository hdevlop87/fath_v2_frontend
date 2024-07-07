"use client"

import { Checkbox } from "@/components/ui/checkbox";
import BadgeIcon from '@/components/ui/BadgeIcons';
import useActionsManager from '@/components/Prompts/useActionsManager';
import { useAuthStore } from "@/store/authStore";

export const expenseColumns = (t) => [
    
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex h-full items-center">
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex h-full items-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableHiding: false,
    },
    {
        id: "index",
        header: "#",
        cell: ({ row, table }) => {
            const rowIndex = row.index + 1;
            return <div>{rowIndex}</div>;
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "amount",
        header: t('expense.amountLabel'),
    },
    {
        accessorKey: "beneficiary",
        header: t('expense.beneficiaryLabel'),
    },
    {
        accessorKey: "type",
        header: t('expense.typeLabel'),
        cell: ({ row }) => {
            const type = t('expense.type.'+row.original.type);
            return <div>{type}</div>;
        },
        canFilter: true,
    },
    {
        accessorKey: "date",
        header: t('expense.dateLabel'),
        cell: ({ row }) => {
            const date = new Date(row.original.date);
            const formattedDate = date.toLocaleDateString("en-US", {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            return <div>{formattedDate}</div>;
        },
    },
    {
        accessorKey: "method",
        header: t('expense.paymentMethodLabel'),
    },
    {
        accessorKey: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row, table }) => {
            const expense = row.original;
            const actionsManager = useActionsManager("expense");
            const user = useAuthStore.use.user();
            const isAdmin = user?.role === 'Admin'; 

            return (
                <div className="text-center">
                    <BadgeIcon disabled={!isAdmin} icon="heroicons:trash" onClick={() => actionsManager.Delete(expense)} />
                    <BadgeIcon disabled={!isAdmin} icon="circum:edit" onClick={() => actionsManager.Update(expense)} />
                    <BadgeIcon icon="iconamoon:eye-light" onClick={() => actionsManager.Read(expense)} />
                </div>
            )
        }
    },
]


