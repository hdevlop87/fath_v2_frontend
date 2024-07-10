'use client'

import React from 'react';
import { Label } from '@/components/ui/label';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { ShieldQuestion, User } from 'lucide-react';


const UserCard = ({ item }) => {

    const { name, role, status, image } = item;

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

    const avatarSrc = image ? `${process.env.NEXT_PUBLIC_API_URL}/${image}` : '/noavatar.png';

    return (
        <Card className='flex flex-col p-4 justify-center items-center gap-3 w-44'>
            <div className="flex items-center gap-2 ">
                <Avatar className='w-24 h-24 relative'>
                    <AvatarImage src={avatarSrc} alt="avatar" />
                    <AvatarFallback>
                        <img
                            src={""}
                            alt=""
                            width={100}
                            height={100}
                            className="z-10"
                        />
                    </AvatarFallback>
                </Avatar>
            </div>

            <div className='flex flex-col w-full gap-2'>
                <Label className='flex items-center gap-2'><User className='w-5 h-5' />{name}</Label>
                <Label className='flex items-center gap-2'><ShieldQuestion className='w-5 h-5' />{role}</Label>
            </div>

            <Badge variant={variantValue}>{status}</Badge>
        </Card>
    );
};

export default React.memo(UserCard);
