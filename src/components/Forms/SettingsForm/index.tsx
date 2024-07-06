'use client'

import React, { useEffect } from 'react';
import { settingsConfig, SettingsType } from '@/config/settingsConfig';
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from '@/components/Forms/FormField'
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";


const SettingForm = ({ settings }) => {


    const form = useForm<SettingsType>({
        resolver: zodResolver(settingsConfig.schema),
        defaultValues: settings
    });

    const onSubmit = (data) => {
        console.log('Submitted data:', data);
    };



    return (
        <div className='flex flex-col gap-4 w-[400px] '>
            <Form {...form}>
                <form id={"setting"} onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full" autoComplete="off">
                    <div className='flex flex-col w-full gap-6 h-full'>
                        {settingsConfig.fields.map((fieldData: any) => (
                            <FormField
                                key={fieldData.name}
                                control={form.control}
                                fieldData={fieldData}
                            />
                        ))}
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default SettingForm;