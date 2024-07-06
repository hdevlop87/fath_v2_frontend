'use client'

import React from 'react';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import BadgeIcon from '@/components/ui/BadgeIcons';
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const CardTable = ({ row, onDelete, onUpdate, onRead }) => {
    const { name, role, status, image } = row.original;

    const getVariantValue = () => {
        switch (status) {
            case 'Active':
                return "success";
            case 'Inactive':
                return "warning";
            case 'Pending':
                return "yellow";
            default:
                return "success";
        }
    };

    const variantValue = getVariantValue();

    return (
        <Card className='flex gap-3 flex-col p-4 w-44 relative justify-center items-center'>
            <div className="flex items-center gap-2 ">
                <div className='absolute h-16 w-16 bg-white z-0 rounded-full'></div>
                <Avatar className='w-24 h-24 relative'>
                    <AvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}/api/files/${image}`} alt="avatar" />
                    <AvatarFallback>
                        <Image
                            src={"/noavatar.png"}
                            alt=""
                            width={100}
                            height={100}
                            className="z-10"
                        />
                    </AvatarFallback>
                </Avatar>
            </div>
            <Label>{name}</Label>
            <Label>{role}</Label>
            <Badge variant={variantValue}>{status}</Badge>
            <div className="text-center">
                <BadgeIcon icon="heroicons:trash" onClick={() => onDelete(row.original)} />
                <BadgeIcon icon="circum:edit" onClick={() => onUpdate(row.original)} />
                <BadgeIcon icon="iconamoon:eye-light" onClick={() => onRead(row.original)} />
            </div>
        </Card>
    );
};

export default React.memo(CardTable);
