import * as z from "zod";

export const LotSchema = z.object({
    lotRef: z.string().nonempty({ message: "lotRef est obligatoire." }),
    status: z.string().nonempty({ message: "Le statut est obligatoire." }),
    size: z.string().nonempty({ message: "La taille est obligatoire." }),
    price: z.coerce.number(),
    zoningCode: z.string().nonempty({ message: "Le code de zonage est obligatoire." })
});

export type LotFormValues = z.infer<typeof LotSchema>;


