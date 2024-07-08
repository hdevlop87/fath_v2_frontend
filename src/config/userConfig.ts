import * as z from "zod";
import { createUser, updateUser, deleteUser } from '@/services/userApi';

export const userConfig = {
    schema: z.object({
        id: z.string().optional(),
        name: z.string(),
        username: z.string().trim().min(4, { message: "Username must be 4 or more characters" }),
        password: z.string().optional(),
        confirmPassword: z.string().optional(),
        email: z.string().optional(),
        image: z.any().optional(),
        status: z.enum(['Active', 'Inactive', 'Pending']).optional(),
        roleId: z.any().optional(),
        createdAt: z.string().optional(),
    }).refine((data) => {
        if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
            return false;
        }
        return true;
    }, {
        message: "Passwords must match",
        path: ["confirmPassword"]
    }),

    fields: [
        {
            "type": "text",
            "name": "name",
            "placeholder": "user.namePlaceholder",
            "label": "user.nameLabel",
        },
        {
            "type": "text",
            "name": "username",
            "placeholder": "user.userNamePlaceholder",
            "label": "user.userNameLabel",
        },
        {
            "type": "text",
            "name": "email",
            "placeholder": "user.emailPlaceholder",
            "label": "user.emailLabel"
        },
        {
            "type": "text",
            "name": "password",
            "note": " (leave empty for no changes)",
            "placeholder": "user.passwordPlaceholder",
            "label": "user.passwordLabel"
        },
        {
            "type": "text",
            "name": "confirmPassword",
            "placeholder": "user.confirmPasswordPlaceholder",
            "label": "user.confirmPasswordLabel"
        },
        {
            "type": "select",
            "name": "roleId",
            "placeholder": "user.rolePlaceholder",
            "label": "user.roleLabel",
            "items": [
                {
                    "label": "Admin",
                    "value": "1"
                },
                {
                    "label": "Editor",
                    "value": "2"
                },
                {
                    "label": "Viewer",
                    "value": "3"
                },
            ]
        },
    ],

    defaultValues: {
        name: 'hicham',
        username: 'hicham',
        password: '123456',
        confirmPassword: '123456',
        email: 'test@test.com',
        roleId: '3'
    },

    queryKey: "users",
    filters: [
        {
            name: "name",
            type: "text",
            placeHolder: 'user.filterByName'
        }
    ],
    mutationConfig: {
        queryKey: 'users',
        apiMethods: {
            delete: deleteUser,
            create: createUser,
            update: updateUser,
        },
    },
    possibleActions: ['Preview','Update','Delete'],
    target: 'user'
};

export type UserType = z.infer<typeof userConfig.schema>;
