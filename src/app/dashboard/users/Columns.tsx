import { Checkbox } from "@/components/ui/checkbox";
import BadgeIcon from '@/components/ui/BadgeIcons';
import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table";
import { UserType } from '@/config/userConfig'
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useActionsManager from '@/components/Prompts/useActionsManager';
import { useAuthStore } from "@/store/authStore";




export const userColumns = (t) => {

    const columns: ColumnDef<UserType>[] = [
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
                const user = row.original;
                const actionsManager = useActionsManager("user");
                return (
                    <div className="flex items-center gap-2">
                        <Avatar className='w-12 h-12 relative' onClick={() => actionsManager.Crop(user)}>
                            <AvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}/${user.image}`} alt="avatar" />
                            <AvatarFallback>
                                <Image
                                    src={"/noavatar.png"}
                                    alt=""
                                    width={100}
                                    height={100}
                                    className="z-10"
                                />
                            </AvatarFallback>
                        </Avatar>
                        {user.name}
                    </div>
                )
            },
        },
        { accessorKey: 'username', header: 'User name' },
        { accessorKey: 'email', header: 'Email' },
        {
            accessorKey: 'createdAt',
            header: 'Created at',
            cell: ({ row }) => {
                const user = row.original;
                const date = new Date(user.createdAt);
                const formattedDate = date.toLocaleDateString("en-US", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                return <div>{formattedDate}</div>;
            },
        },
        { accessorKey: 'role', header: 'Role' },
        {
            accessorKey: "status",
            header: 'Status',
            cell: ({ row, table }) => {
                const user = row.original;
                let variantValue;
                switch (user.status) {
                    case 'Active':
                        variantValue = "yellow";
                        break;
                    case 'Inactive':
                        variantValue = "warning";
                        break;
                    case 'Pending':
                        variantValue = "success";
                        break;
                }
                return (
                    <Badge variant={variantValue}>{user.status}</Badge>
                )
            },
        },
        {
            accessorKey: "actions",
            header: () => <div className="text-center">Actions</div>,
            cell: ({ row, table }) => {
                const user = row.original;
                const actionsManager = useActionsManager("user");
                const muser = useAuthStore.use.user();
                const isAdmin = muser?.role === 'Admin';

                return (
                    <div className="text-center">
                        <BadgeIcon disabled={!isAdmin} icon="heroicons:trash" onClick={() => actionsManager.Delete(user)} />
                        <BadgeIcon disabled={!isAdmin} icon="circum:edit" onClick={() => actionsManager.Update(user)} />
                        <BadgeIcon icon="iconamoon:eye-light" onClick={() => actionsManager.Preview(user)} />
                    </div>
                )
            }
        },

    ]

    return columns
}



