"use client";

import useActionsManager from '@/components/Prompts/useActionsManager';
import { Checkbox } from "@/components/ui/checkbox";
import BadgeIcon from '@/components/ui/BadgeIcons';
import { useAuthStore } from "@/store/authStore";

export const permissionColumns = (t) => [
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
        accessorKey: "permissionName",
        header: t('permission.permissionNameLabel'),
        canFilter: true,
        cell: ({ row }) => {
            const permissionName = row.original.permissionName;
            return (
                <div className="">
                    {permissionName}
                </div>
            )
        },
    },
    {
        accessorKey: "description",
        header: t('permission.descriptionLabel'),
        cell: ({ row }) => {
            const description = row.original.description;
            return (
                <div className="">
                    {description}
                </div>
            )
        },
    },
    {
        accessorKey: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row, table }) => {
            const permission = row.original;
            const actionsManager = useActionsManager("permission");
            const user = useAuthStore.use.user();

            return (
                <div className="text-center">
                    <BadgeIcon icon="heroicons:trash" onClick={() => actionsManager.Delete(permission)} />
                    <BadgeIcon icon="circum:edit" onClick={() => actionsManager.Update(permission)} />
                    <BadgeIcon icon="iconamoon:eye-light" onClick={() => console.log("preview permission")} />
                </div>
            )
        }
    },
];
