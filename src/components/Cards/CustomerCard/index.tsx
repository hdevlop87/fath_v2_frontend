'use client'

import React from 'react';
import { Label } from '@/components/ui/label';
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Tag, User, CircleOff, Phone } from 'lucide-react';

const CustomerCard = ({ item }) => {
    const { firstName, lastName, CIN, lotRefs, image, phone } = item;

    const isValidLotRefs = lotRefs.length > 0 && !(lotRefs.length === 1 && lotRefs[0] === 'NULL');
    const avatarSrc = image ? `${process.env.NEXT_PUBLIC_API_URL}/${image}` : '/noavatar.png';
    const fullName = `${firstName} ${lastName}`;

    return (
        <Card className='flex flex-col p-4 justify-center items-center gap-3 w-44'>
            <div className="flex items-center gap-2 ">
                <Avatar className='w-24 h-24 relative'>
                    <AvatarImage src={avatarSrc} alt="avatar" />
                    <AvatarFallback>
                        <Image
                            src="/noavatar.png"
                            alt="avatar fallback"
                            width={100}
                            height={100}
                            className="z-10" 
                        />
                    </AvatarFallback>
                </Avatar>
            </div>
            <Label className='flex items-center gap-2'><User className='w-5 h-5' />{fullName}</Label>
            <Label className='flex items-center gap-2'><Phone className='w-5 h-5' />{phone}</Label>
            <Label className='flex items-center gap-2'><Tag className='w-5 h-5' />{CIN}</Label>

            {isValidLotRefs ? (
                <div className='flex gap-1'>
                    Lots:
                    {lotRefs.map((lotRef, index) => (
                        <span key={index}>
                            {lotRef}{index < lotRefs.length - 1 ? ', ' : ''}
                        </span>
                    ))}
                </div>
            ) : (
                <div className="text-sm text-gray-500">
                    <CircleOff className='w-5 h-5' />
                </div>
            )}
        </Card>
    );
};

export default CustomerCard;
