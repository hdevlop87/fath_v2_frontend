import * as z from "zod";

export const PaymentSchema = z.object({
    amount: z.coerce.number(),
    date: z.date().optional().refine(date => date instanceof Date, { message: "Une date de paiement est obligatoire." }),
    method: z.string().nonempty({ message: "La méthode de paiement est obligatoire." }),
    paymentReference: z.string().optional(),
    receipt: z.any(),
    notes: z.string().optional()
});

export type PaymentFormValues = z.infer<typeof PaymentSchema>;

