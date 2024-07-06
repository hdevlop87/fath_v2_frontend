import { Checkbox } from "@/components/ui/checkbox";
import BadgeIcon from '@/components/ui/BadgeIcons';
import { ColumnDef } from "@tanstack/react-table";
import { FolderType } from '@/config/folderConfig'
import useActionsManager from '@/components/Prompts/useActionsManager';
import { formatFileSize, truncateFilename } from '@/lib/utils';
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";

export const fileColumns = (t) => {

    const columns: ColumnDef<FolderType>[] = [
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
            accessorKey: "name",
            header: 'Name',
            cell: ({ row, table }) => {
              const item: any = row.original;
              const showType = item.type !== 'folder'; // Flag to control type display
            
              const fileName = truncateFilename(item.name, 20);
              const displayText = showType ? `${fileName}.${item.type}` : fileName;
            
              return (
                <div className="flex items-center gap-2">
                  <Image src={`/filesIcon/${item.icon}`} width={28} height={28} alt="icon" />
                  {displayText}
                </div>
              );
            }
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
        {
            accessorKey: 'size',
            header: 'Size',
            cell: ({ row }) => {
                const { size } = row.original;
                return <div>{formatFileSize(size)}</div>;
            },
        },
        {
            accessorKey: 'filesCount',
            header: 'Files count',
            cell: ({ row }) => <div>{row.original.filesCount ?? <span className="block ml-8">_</span>}</div>,
        },
        {
            accessorKey: 'maxSize',
            header: 'Max size',
            cell: ({ row }) => {
                const { maxSize } = row.original;
                return (
                    <div>
                        {maxSize ? `${maxSize} GB` : <span className="block ml-4">_</span>}
                    </div>
                );
            },
        },
        {
            accessorKey: 'isLocked',
            header: 'Status',
            cell: ({ row }) => {
                const isLocked = row.original.isLocked;
                const icon = isLocked ? "mdi:lock" : "mdi:lock-open-variant";
                const color = isLocked ? "red" : "gray";
                return (
                    <div className="text-center">
                        <BadgeIcon icon={icon} color={color} />
                    </div>
                );
            },
        },
        {
            accessorKey: "actions",
            header: () => <div className="text-center">Actions</div>,
            cell: ({ row }) => {
                const item = row.original;
                const actionsManager = useActionsManager(item.type === "folder" ? "Folder" : "File");
                const user = useAuthStore.use.user();
                const isAdmin = user?.role === 'Admin';
            
                return (
                    <div className="text-center">
                        {item.type !== "folder" ? (
                            <>
                                <BadgeIcon disabled={!isAdmin} icon="heroicons:trash" onClick={() => actionsManager.Delete(item)} />
                                <BadgeIcon disabled={!isAdmin} icon="circum:edit" onClick={() => actionsManager.Rename(item)} />
                                <BadgeIcon icon="iconamoon:eye-light" onClick={() => actionsManager.Preview(item)} />
                            </>
                        ) : (
                            <>
                                <BadgeIcon disabled={!isAdmin} icon="heroicons:trash" onClick={() => actionsManager.Delete(item)} />
                                <BadgeIcon disabled={!isAdmin} icon="circum:edit" onClick={() => actionsManager.Update(item)} />
                                <BadgeIcon icon="iconamoon:eye-light" onClick={() => actionsManager.Read(item)} />
                            </>
                        )}
                    </div>
                );
            },
        },

    ]

    return columns
}



