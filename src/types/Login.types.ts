import * as z from "zod";

export const LoginSchema = z.object({
    username: z.string().nonempty({ message: "Username is required." }),
    password: z.string().nonempty({ message: "Password is required." })
});

export type LoginFormValues = {
    username: string;
    password: string;
};

export const defaultLoginValues: LoginFormValues = {
    username: 'admin',
    password: '123456',
};

export interface LoginProps {
    onSubmit: (data: LoginFormValues) => void;
};