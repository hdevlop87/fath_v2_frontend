import * as z from "zod";

export const userConfig = {
    schema: z.object({
        id: z.string().optional(),
        name: z.string(),
        username: z.string().trim().min(4, { message: "Username must be 4 or more characters" }),
        password: z.string().trim().min(6, { message: "Password must be 6 or more characters" }),
        phone: z.string(),
        email: z.string().email(),
        image: z.string().optional(),
        status: z.enum(['Active', 'Inactive', 'Pending']),
        roleId: z.string(),
    }),

    fields: [
        {
            "type": "text",
            "name": "firstName",
            "placeholder": "customer.firstNamePlaceholder",
            "label": "customer.firstNameLabel",
            "width": "48%"
        },
        {
            "type": "text",
            "name": "lastName",
            "placeholder": "customer.lastNamePlaceholder",
            "label": "customer.lastNameLabel",
            "width": "48%"
        },
        {
            "type": "text",
            "name": "phone",
            "placeholder": "customer.phonePlaceholder",
            "label": "customer.phoneLabel"
        },
        {
            "type": "text",
            "name": "email",
            "placeholder": "customer.emailPlaceholder",
            "label": "customer.emailLabel"
        },
        {
            "type": "text",
            "name": "address",
            "placeholder": "customer.addressPlaceholder",
            "label": "customer.addressLabel"
        },
        {
            "type": "text",
            "name": "CIN",
            "placeholder": "customer.CINPlaceholder",
            "label": "customer.CINLabel"
        }
    ],

    defaultValues: {
        username: 'admin',
        password: '123456',
    },

    queryKey: "users",
    filters: [
        {
            name: "name",
            type: "text",
            placeHolder: 'Filtrer par Nom.....'
        }
    ],
    
};

export type UserType = z.infer<typeof userConfig.schema>;

