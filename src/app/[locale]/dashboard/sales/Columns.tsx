import { Checkbox } from "@/components/ui/checkbox";
import BadgeIcon from '@/components/ui/BadgeIcons';
import { Badge } from "@/components/ui/badge"
import { useRouter } from 'next/navigation'
import useStore from '@/store/dataStore';
import { getSaleByID } from '@/services/salesApi';
import {formatNumber} from '@/lib/utils'
import { formatCommas } from "@/lib/utils";

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
                <Badge variant={variantValue}>{t(`sale.status.${sale.status.toLowerCase()}`)}</Badge>
            )
        },
    },
    {
        accessorKey: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row, table }) => {
            const sale = row.original;
            const meta = table.options.meta;
            const router = useRouter()

            const handleView = async () => {
                try {
                    router.push(`/dashboard/sales/saleView?saleID=${sale.saleID}`);
                } catch (error) {
                    console.error("Error fetching and updating sale:", error);
                }
            };

            const handleEdit = async () => {
                const { setCustomerData, setSaleData, setLotData } = useStore.getState();
                const saleData = await getSaleByID(sale.saleID);
                setCustomerData(saleData.customer);
                setSaleData(saleData.sale);
                setLotData(saleData.lot);
                meta.handleEdit(sale)
            }

            return (
                <div className="text-center">
                    <BadgeIcon icon="heroicons:trash" onClick={() => meta.handleDelete(sale)} />
                    <BadgeIcon icon="circum:edit" onClick={() => handleEdit()} />
                    <BadgeIcon icon="iconamoon:eye-light" onClick={() => handleView()} />
                </div>
            )
        }
    }
]
