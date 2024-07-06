"use client"

import { Checkbox } from "@/components/ui/checkbox";
import BadgeIcon from '@/components/ui/BadgeIcons';
import { Badge } from "@/components/ui/badge"
import {formatNumber,formatCommas} from '@/lib/utils'
import useActionsManager from '@/components/Prompts/useActionsManager';
import { useRouter } from 'next/navigation'
import { useAuthStore } from "@/store/authStore";

export const saleColumns = (t) => [
    
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
        enableSorting: false,
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
        accessorKey: "customerName",
        header: t('sale.customerNameLabel'),
        canFilter: true,
        cell: ({ row }) => {
            const sale = row.original.customerName;
            return <div>{sale}</div>;
        },
    },
    {
        accessorKey: "lotRef",
        header: t('lot.lotRefLabel'),
    },
    {
        accessorKey: "pricePerM2",
        header: t('sale.pricePerM2Label'), 
        cell: ({ row }) => {
            const pricePerM2 = row.original.pricePerM2;
            return <div>{formatCommas(formatNumber(pricePerM2))}</div>;
        },
    },
    {
        accessorKey: "totalPrice",
        header: t('sale.totalPriceCol'),
        cell: ({ row }) => {
            const totalPrice = row.original.totalPrice;
            return <div>{formatCommas(formatNumber(totalPrice))}</div>;
        },
    },
    {
        accessorKey: "date",
        header: "Date",
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
        accessorKey: "status",
        header: t('sale.statusLabel'),
        cell: ({ row, table }) => {
            const sale = row.original;

            let variantValue;
            switch (sale.status) {
                case 'Initiated':
                    variantValue = "yellow";
                    break;
                case 'Ongoing':
                    variantValue = "warning";
                    break;
                case 'Completed':
                    variantValue = "success";
                    break;
                case 'Canceled':
                    variantValue = "destructive";
            }
            return (
                <Badge variant={variantValue}>{t(`sale.status.${sale.status}`)}</Badge>
            )
        },
    },
    {
        accessorKey: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row, table }) => {
            const sale = row.original;
            const actionsManager = useActionsManager("sale");
            const router = useRouter();
            const user = useAuthStore.use.user();
            const isAdmin = user?.role === 'Admin';

            const handleView = async () => {
                try {
                    router.push(`/dashboard/sales/saleView?saleID=${sale.saleId}`);
                } catch (error) {
                    console.error("Error fetching and updating sale:", error);
                }
            };

            return (
                <div className="text-center">
                    <BadgeIcon disabled={!isAdmin} icon="heroicons:trash" onClick={() => actionsManager.Delete(sale)} />
                    <BadgeIcon disabled={!isAdmin} icon="circum:edit" onClick={() => actionsManager.Update(sale)} />
                    <BadgeIcon icon="iconamoon:eye-light" onClick={() => handleView()} />
                </div>
            )
        }
    },
]


