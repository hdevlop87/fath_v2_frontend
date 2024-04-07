import * as z from "zod";

export const ProfileSchema = z.object({
    name: z.string().nonempty({ message: "Le prénom est obligatoire." }),
    username: z.string().nonempty({ message: "Username is required." }),
    email: z.string().email({ message: "Email invalide." }).optional(),
    image: z.any(),
});

export type ProfileFormValues = z.infer<typeof ProfileSchema>;
