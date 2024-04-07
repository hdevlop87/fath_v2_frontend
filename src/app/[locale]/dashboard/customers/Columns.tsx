import { Checkbox } from "@/components/ui/checkbox";
import BadgeIcon from '@/components/ui/BadgeIcons';

export const customerColumns = (t) => [
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
        accessorKey: "firstName",
        header: t('customer.firstNameLabel'),
    },
    {
        accessorKey: "lastName",
        header: t('customer.lastNameLabel'),
        canFilter: true,
    },
    {
        accessorKey: "CIN",
        header: t('customer.CINLabel'),
    },
    {
        accessorKey: "phone",
        header: t('customer.phoneLabel'),
        
    },
    {
        accessorKey: "lotRefs",
        header: () => "lotRefs",
        cell: ({ row, table }) => {
            const lotRefs = row.original.lotRefs;
            return (
                <div>
                    {lotRefs.map((lotRef, index) => (
                        <span key={index}>
                            {lotRef}{index < lotRefs.length - 1 ? ', ' : ''}
                        </span>
                    ))}
                </div>
            );
        }
    },

    {
        accessorKey: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row, table }) => {
            const customer = row.original;
            const meta = table.options.meta;
            return (
                <div className="text-center">
                    <BadgeIcon icon="heroicons:trash" onClick={() => meta.handleDelete(customer)} />
                    <BadgeIcon icon="circum:edit" onClick={() => meta.handleEdit(customer)} />
                    <BadgeIcon icon="iconamoon:eye-light" onClick={() => console.log(customer)} />
                </div>
            )
        }
    }
]


