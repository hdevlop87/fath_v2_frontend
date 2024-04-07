"use client"

import React from 'react';
import { ReloadIcon } from "@radix-ui/react-icons";
import { Icon } from '@iconify/react';
import { Button } from "@/components/ui/button";

const FormButton = ({ loading, title, icon = 'ic:baseline-note-add', id = "hook-form" }) => {
    return (
        <Button type="submit" form={id} className=' gap-1'>
            {loading ? (
                <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please Wait...
                </>
            ) : (
                <>
                    <Icon icon={icon} width={22} />
                    {title || 'submit'}
                </>
            )}
        </Button>
    );
}

export default FormButton;
