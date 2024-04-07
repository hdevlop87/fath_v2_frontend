"use client"

import React, { useEffect, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import setting_profile from '@/settingsJson/setting_profile.json';
import { ProfileSchema, ProfileFormValues } from '@/types/setting_profile.types';
import FormButton from './FormButton';
import FieldRenderer from './FieldRenderer';
import { useTranslations } from 'next-intl';
import { useSession } from "next-auth/react";

const Profile = ({ data }) => {
    const t = useTranslations();
    const { data: session } = useSession();
    const [loading, setloading] = useState(false);

    const { fields } = setting_profile;

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            name: session?.user?.name || "",
            email: session?.user?.email || "",
            username: session?.user?.username || "",
        },
    });

    function onSubmit(values: ProfileFormValues) {
        console.log(values);

    }

    return (
        <Form {...form}>
            <form id="customer-form" onSubmit={form.handleSubmit(onSubmit)} className="w-[400px] flex flex-wrap gap-4" >
                {fields.map((fieldData) => (
                    <FieldRenderer
                        key={fieldData.name}
                        control={form.control}
                        fieldData={{
                            ...fieldData,
                            placeholder: t(fieldData.placeholder),
                            label: t(fieldData.label)
                        }}
                    />
                ))}

            </form>
            <div className='flex w-full justify-start gap-2 mt-2'>
                <FormButton loading={loading} title={t('button.update')} id="customer-form" />
            </div>
        </Form>
    )
}

export default Profile;
