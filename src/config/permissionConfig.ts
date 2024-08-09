import * as z from "zod";
import { createPermission, updatePermission, deletePermission, bulkAddPermissions } from '@/services/permissionApi';

export const permissionConfig = {
    schema: z.object({
        permissionId: z.any().optional(),
        permissionName: z.string().trim().min(1, { message: "permissionName est obligatoire." }),
        description: z.string().optional(),
    }),

    fields: [
        {
            "type": "text",
            "name": "permissionName",
            "placeholder": "permission.permissionNamePlaceholder",
            "label": "permission.permissionNameLabel"
        },
        {
            "type": "text",
            "name": "description",
            "placeholder": "permission.descPlaceholder",
            "label": "permission.descLabel"
        },
    ],

    defaultValues: {
        permissionName: "",
        description: ""
    },

    queryKey: "permissions",
    filters: [
        {
            name: "permissionName",
            type: "text",
            placeholder: "permission.permissionNameLabel"
        }
    ],
    mutationConfig: {
        queryKey: 'permissions',
        apiMethods: {
            delete: deletePermission,
            create: createPermission,
            update: updatePermission,
            upload: bulkAddPermissions
        },
    },
    target: 'Permission'
};

export type PermissionType = z.infer<typeof permissionConfig.schema>;
