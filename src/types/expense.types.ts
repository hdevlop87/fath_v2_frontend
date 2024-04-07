import * as z from "zod";

export const ExpenseSchema = z.object({
    amount: z.coerce.number(),
    date: z.date().default(new Date()).refine(date => date instanceof Date, { message: "La date est invalide." }),
    beneficiary: z.string().optional(),
    type: z.string().nonempty(),
    paymentMethod: z.string().nonempty({ message: "La méthode de paiement est obligatoire." }),
    paymentReference: z.string().optional(),
    paymentImage: z.any().optional(),
    notes: z.string().optional(),
});

export type ExpenseFormValues = z.infer<typeof ExpenseSchema>;






// amount: z.preprocess((a) => parseFloat(z.string().parse(a)),z.number().positive().min(1)),