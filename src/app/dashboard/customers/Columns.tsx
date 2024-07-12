import { Checkbox } from "@/components/ui/checkbox";
import BadgeIcon from '@/components/ui/BadgeIcons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import useActionsManager from '@/components/Prompts/useActionsManager';
import { useAuthStore } from '@/store/authStore';

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
        accessorKey: "name",
        header: 'Name',
        cell: ({ row, table }) => {
            const user = row.original;
            return (
                <div className="flex items-center gap-2">
                    <Avatar className='w-12 h-12 relative'>
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
                    {`${user.name}`}
                </div>
            )
        },
    },
    {
        accessorKey: "gender",
        header: t('customer.genderLabel'),
    },
    {
        accessorKey: "CIN",
        header: t('customer.CINLabel'),
    },
    { accessorKey: 'email', header: 'Email' },
    {
        accessorKey: "phone",
        header: t('customer.phoneLabel'),

    },
    {
        accessorKey: "lotRefs",
        header: () => "lotRefs",
        cell: ({ row, table }) => {
            const lotRefs = row.original.lotRefs;
            const isValidLotRefs = lotRefs.length > 0 && !(lotRefs.length === 1 && lotRefs[0] === 'NULL');

            return (
                <>
                    {isValidLotRefs ? (
                        <div>
                            {lotRefs.map((lotRef, index) => (
                                <span key={index}>
                                    {lotRef}{index < lotRefs.length - 1 ? ', ' : ''}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <div className="text-md text-gray-600">
                            <Icon icon="ph:empty-bold" className="w-5 h-5"/>
                        </div>
                    )}
                </>
            );
        }
    },
    {
        accessorKey: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row, table }) => {
            const customer = row.original;
            const actionsManager = useActionsManager("customer");
            const user = useAuthStore.use.user();
           const isAuthorized = user?.role === 'Admin' || user?.role === 'Editor';

            return (
                <div className="text-center">
                    <BadgeIcon disabled={isAuthorized} icon="heroicons:trash" onClick={() => actionsManager.Delete(customer)} />
                    <BadgeIcon disabled={isAuthorized} icon="circum:edit" onClick={() => actionsManager.Update(customer)} />
                    <BadgeIcon icon="iconamoon:eye-light" onClick={() => actionsManager.Preview(customer)} />
                </div>
            )
        }
    },
]


