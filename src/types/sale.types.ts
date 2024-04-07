import * as z from "zod";

export const SaleSchema = z.object({
    lotRef: z.string().nonempty({ message: "Lot ID is required." }),
    customerID: z.string().optional(),
    pricePerM2: z.coerce.number(),
    date: z.date({required_error: "A date of sale is required."}).optional(),
    status: z.string().default("Initiated"),
    isActif: z.boolean().optional(),
});


export type SaleFormValues = z.infer<typeof SaleSchema>;  