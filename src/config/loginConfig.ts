import * as z from "zod";

export const config = {
    schema: z.object({
        username: z.string().trim().min(4, { message: "Username must be 4 or more characters" }),
        password: z.string().trim().min(6, { message: "Password must be 6 or more characters" })
    }),
    fields: [
        {
            name: 'username',
            type: 'text',
            placeholder: 'auth.username.placeholder',
            label: 'auth.username.label'
        },
        {
            name: 'password',
            type: 'password',
            placeholder: 'auth.password.placeholder',
            label: 'auth.password.label'
        },
    ],
    defaultValues: {
        username: '',
        password: '',
    },
};

export type loginType = z.infer<typeof config.schema>;
