import * as z from "zod";
import { createCustomer, updateCustomer, deleteCustomer,bulkAddCustomers } from '@/services/customersApi'
export const customerConfig = {
    schema: z.object({
        customerId: z.any().optional(),
        name: z.string().trim().min(1, { message: "Le nom du client est obligatoire." }),
        gender: z.any().optional(),
        birthday: z.string().optional(),
        phone: z.string().trim().min(1, { message: "Le numéro de téléphone est obligatoire." }),
        email: z.any().optional(),
        address: z.any().optional(),
        CIN: z.string().trim().min(1,{ message: "Le CIN est obligatoire." }),
        image: z.any().optional(),
        createdAt: z.string().optional(),
    }),

    fields: [
        {
            "type": "text",
            "name": "name",
            "placeholder": "customer.namePlaceholder",
            "label": "customer.nameLabel", 
        },
        {
            "type": "select",
            "name": "gender",
            "placeholder": "customer.genderPlaceholder",
            "label": "customer.genderLabel",
            "items": [
                { "label": "Male", "value": "male" },
                { "label": "Female", "value": "female" }
            ]
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
        name: '',
        birthday: "1990-10-15",
        gender: "male",
        phone: '',
        email: '',
        address: '456 Maple St, Shelbyville',
        CIN: ''
    },

    queryKey: "customers",
    filters: [
        {
            name: "name",
            type: "text",
            placeHolder: 'customer.filterByCustomer'
        }
    ],
    mutationConfig : {
        queryKey: 'customers',
        apiMethods: {
           delete: deleteCustomer,
           create: createCustomer,
           update: updateCustomer,
           upload: bulkAddCustomers 
        }
     },
     possibleActions: ['Preview','Update','Delete'],
    target: 'Customer'

};

export type CustomerType = z.infer<typeof customerConfig.schema>;

