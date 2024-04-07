"use client"
import { Checkbox } from "@/components/ui/checkbox";
import BadgeIcon from '@/components/ui/BadgeIcons'
import { Badge } from "@/components/ui/badge"

export const lotColumns = (t: any) => [

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
        accessorKey: "lotRef",
        header: t('lot.lotRefLabel'),
        enableSorting: true,
    },
    {
        accessorKey: "size",
        header: t('lot.sizeLabel'),
        canFilter: true,
        cell: ({ row }) => {
            let size = parseFloat(row.original.size);
            const formattedPrice = size % 1 === 0 ? Math.floor(size) : size.toFixed(2);
            return (
                <div className="">
                    {formattedPrice}
                </div>
            )
        },
    },
    {
        accessorKey: "zoningCode",
        header: t('lot.zoningCodeLabel'),
    },
    {
        accessorKey: "price",
        header: t('lot.priceLabel'),
    },
    {
        accessorKey: "status",
        header: t('lot.statusLabel'),
        cell: ({ row, table }) => {
            const lot = row.original;

            let variantValue;
            switch (lot.status) {
                case 'Canceled':
                    variantValue = "destructive";
                    break;
                case 'Reserved':
                    variantValue = "warning";
                    break;
                case 'Ongoing':
                    variantValue = "yellow";
                    break;
                case 'Sold':
                    variantValue = "success";
                    break;
                default:
                    variantValue = "outline";
                    break;
            }

            return (
                <div className="">
                    <Badge variant={variantValue}>{t(`lot.status.${lot.status.toLowerCase()}`)}</Badge>
                </div>
            )
        },
        
    },
    {
        accessorKey: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row, table }) => {
            const lot = row.original;
            const meta = table.options.meta;
            return (
                <div className="text-center">
                    <BadgeIcon icon="heroicons:trash" onClick={() => meta.handleDelete(lot)} />
                    <BadgeIcon icon="circum:edit" onClick={() => meta.handleEdit(lot)} />
                    <BadgeIcon icon="iconamoon:eye-light" onClick={() => console.log(lot)} />
                </div>
            )
        }
    }
]
