import * as z from "zod";
import { createRole, updateRole, deleteRole, bulkAddRoles } from '@/services/roleApi';

export const roleConfig = {
    schema: z.object({
        roleId: z.any().optional(),
        roleName: z.string().trim().min(1, { message: "roleName est obligatoire." }),
        description: z.string().optional(),
    }),

    fields: [
        {
            "type": "text",
            "name": "roleName",
            "placeholder": "role.roleNamePlaceholder",
            "label": "role.roleNameLabel"
        },
        {
            "type": "text",
            "name": "description",
            "placeholder": "role.descriptionPlaceholder",
            "label": "role.descriptionLabel"
        },
    ],

    defaultValues: {
        roleName: "",
        description: ""
    },

    queryKey: "roles",
    filters: [
        {
            name: "roleName",
            type: "text",
            placeholder: "role.roleNameLabel"
        }
    ],
    mutationConfig: {
        queryKey: 'roles',
        apiMethods: {
            delete: deleteRole,
            create: createRole,
            update: updateRole,
            upload: bulkAddRoles
        },
    },
    target: 'Role'
};

export type RoleType = z.infer<typeof roleConfig.schema>;
