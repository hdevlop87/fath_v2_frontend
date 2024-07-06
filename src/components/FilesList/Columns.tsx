import { Checkbox } from "@/components/ui/checkbox";
import BadgeIcon from '@/components/ui/BadgeIcons';
import { ColumnDef } from "@tanstack/react-table";
import { FileType } from '@/config/fileConfig'
import { useActionsStore } from '@/store/actionStore'
import MimetypeImage from '@/components/MimetypeImage'

export const fileColumns = (t) => {

    const columns: ColumnDef<FileType>[] = [
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
            accessorKey: "filename",
            header: 'File name',
            cell: ({ row, table }) => {
                const file = row.original;
                return ( 
                    <div className="flex items-center gap-2">
                        <MimetypeImage type={file.mimetype} className="w-8 h-8"/>
                        {file.originalname}
                    </div>
                )
            },
        },

        {
            accessorKey: 'updatedAt',
            header: 'Last modified',
            cell: ({ row }) => {
                const file = row.original;
                const date = new Date(file.updatedAt);
                const formattedDate = date.toLocaleDateString("en-US", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                return <div>{formattedDate}</div>;
            },
        },
        { accessorKey: 'size', header: 'File size' },

        {
            accessorKey: 'type',
            header: 'Type',
            cell: ({ row }) => {
                const file = row.original;
                const getFileExtension = (filename) => {
                    const parts = filename.split('.');
                    return parts[parts.length - 1];
                };
                const extension = getFileExtension(file.filename);
                return <div>{extension}</div>;
            },
        },

        {
            accessorKey: "actions",
            header: () => <div className="text-center">Actions</div>,
            cell: ({ row, table }) => {
                const file = row.original;
                const onDelete = useActionsStore.use.onDelete();
                const onUpdate = useActionsStore.use.onUpdate();
                const onRead = useActionsStore.use.onRead();
                return (
                    <div className="text-center">
                        <BadgeIcon icon="heroicons:trash" onClick={() => onDelete(file)} />
                        <BadgeIcon icon="circum:edit" onClick={() => onUpdate(file)} />
                        <BadgeIcon icon="iconamoon:eye-light" onClick={() => onRead(file)} />
                    </div>
                )
            }
        },

    ]

    return columns
}



