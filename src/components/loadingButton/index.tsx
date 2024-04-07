"use client"

import React from 'react';
import { ReloadIcon } from "@radix-ui/react-icons";
import { Icon } from '@iconify/react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils'

const NewButton = ({ loading, title, icon = 'ic:baseline-note-add', onClick, className='',variant }) => {
    
    return (
        <Button className={cn('gap-1', className)} onClick={onClick} variant={variant}>
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

export default NewButton;
