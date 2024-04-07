import * as z from "zod";

export const CustomerSchema = z.object({
    customerID: z.string().optional(),
    firstName: z.string().nonempty({ message: "Le prénom est obligatoire." }),
    lastName: z.string().nonempty({ message: "Le nom de famille est obligatoire." }),
    phone: z.string().nonempty({ message: "Le numéro de téléphone est obligatoire." }),
    email: z.string().email({ message: "Email invalide." }).optional(),
    address: z.string().optional(),
    CIN: z.string().nonempty({ message: "Le CIN est obligatoire." })
});

export type CustomerFormValues = z.infer<typeof CustomerSchema>;
