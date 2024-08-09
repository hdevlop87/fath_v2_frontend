"use client";

import useActionsManager from '@/components/Prompts/useActionsManager';
import { Checkbox } from "@/components/ui/checkbox";
import BadgeIcon from '@/components/ui/BadgeIcons';
import { useAuthStore } from "@/store/authStore";

export const roleColumns = (t) => [
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
        accessorKey: "roleName",
        header: t('role.roleNameLabel'),
        canFilter: true,
        cell: ({ row }) => {
            const roleName = row.original.roleName;
            return (
                <div className="">
                    {roleName}
                </div>
            )
        },
    },
    {
        accessorKey: "description",
        header: t('role.descriptionLabel'),
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
            const role = row.original;
            const actionsManager = useActionsManager("role");
            const user = useAuthStore.use.user();
            const isAuthorized = user?.role === 'Admin' || user?.role === 'Editor';

            return (
                <div className="text-center">
                    <BadgeIcon disabled={!isAuthorized} icon="heroicons:trash" onClick={() => actionsManager.Delete(role)} />
                    <BadgeIcon disabled={!isAuthorized} icon="circum:edit" onClick={() => actionsManager.Update(role)} />
                    <BadgeIcon icon="iconamoon:eye-light" onClick={() => console.log("preview role")}/>
                </div>
            )
        }
    },
];
