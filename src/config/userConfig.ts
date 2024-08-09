import * as z from "zod";
import { createUser, updateUser, deleteUser } from '@/services/userApi';

export const userConfig = {
    schema: z.object({
        id: z.string().optional(),
        name: z.string({ required_error: "Le Nom est requis" }),
        username: z.string({ required_error: "Le nom d'utilisateur est obligatoire." }),
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
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        roleId: ''
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
    possibleActions: ['Preview','Update','Delete','Password'],
    target: 'user'
};

export type UserType = z.infer<typeof userConfig.schema>;
