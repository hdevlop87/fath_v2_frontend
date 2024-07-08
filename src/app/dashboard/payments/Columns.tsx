import { Checkbox } from "@/components/ui/checkbox";
import BadgeIcon from '@/components/ui/BadgeIcons';
import { Badge } from "@/components/ui/badge"
import useActionsManager from '@/components/Prompts/useActionsManager';
import { useAuthStore } from "@/store/authStore";


export const paymentColumns = (t) => [
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
        accessorKey: "amount",
        header: t('payment.amountLabel'),
    },
    {
        accessorKey: "method",
        header: t('payment.methodLabel'),
    },
    {
        accessorKey: "date",
        header: t('payment.dateLabel'),
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
        header: t('payment.statusLabel'),
        cell: ({ row, table }) => {
            const payment = row.original;
            let variantValue;
            switch (payment.status) { 
              case 'Pending':
                  variantValue = "warning";
                  break;
              case 'Verified':
                  variantValue = "success";
                  break;
              case 'Failed':
                  variantValue = "destructive";
                  break;
            }
            return (
              <div className="">
                <Badge variant={variantValue}>{t(`payment.status.${payment.status.toLowerCase()}`)}</Badge>
              </div>
            )
        },
        
        canFilter: true,
    },
    {
        accessorKey: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row, table }) => {
            const payment = row.original;
            const actionsManager = useActionsManager("payment");
            const user = useAuthStore.use.user();
            const isAdmin = user?.role === 'Admin';

            const handleFileClick = async () => {

            };

            return (
                <div className="text-center">
                    <BadgeIcon disabled={!isAdmin} icon="heroicons:trash" onClick={() => actionsManager.Delete(payment)} />
                    <BadgeIcon disabled={!isAdmin} icon="circum:edit" onClick={() => actionsManager.Update(payment)} />
                    <BadgeIcon icon="fluent:receipt-28-regular" onClick={() => actionsManager.Preview(payment)} />
                </div>
            )
        }
    }
    
]

