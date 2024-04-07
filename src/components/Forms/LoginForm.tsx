'use client'

import React from 'react';
import AutoInput from '@/components/AutoInput';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { config, loginType } from '@/config/loginConfig';
import { useTranslations } from 'next-intl';
import { Label } from '@/components/ui/label';
import { Inika } from 'next/font/google';
import { cn } from '@/lib/utils';
import SubmitButton from '@/components/submitButton'
import Alert from '@/components/Alert'
import { useAuthStore, login } from '@/store/authStore';

const inika = Inika({
    weight: '700',
    subsets: ['latin'],
});

const Login = () => {

    const t = useTranslations();
    const message = useAuthStore.use.message();
    const status = useAuthStore.use.status();

    const form = useForm<loginType>({
        resolver: zodResolver(config.schema),
        defaultValues: config.defaultValues
    });

    const handleSubmit = async (data: loginType) => {
        await login(data);
    };
   
    return (
        <>
            <Label className={cn('text-xl font-semibold', inika.className)}>{t('auth.welcomeBack')}</Label>
            <Form {...form}>
                <form id='login-form' onSubmit={form.handleSubmit(handleSubmit)} className="w-full space-y-6" autoComplete="off">
                    {config.fields.map((fieldData: any) => (
                        <FormField
                            key={fieldData.name}
                            control={form.control}
                            name={fieldData.name}
                            render={({ field }) => (
                                <FormItem>
                                    <AutoInput
                                        type={fieldData.type}
                                        placeholder={t(fieldData.placeholder)}
                                        field={field}
                                        label={t(fieldData.label)}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                </form>
            </Form>
            <Alert show={message !== ''} msg={message} variant={status} />

            <SubmitButton
                submitText='button.loginButton'
                loadingText='button.pleaseWait'
                className='w-full gap-1'
                loading={status === 'loading'}
                form='login-form'
            />
        </>
    )
}

export default Login;