import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";

const UserAvatar = () => {

    const user = useAuthStore.getState().user;

    return (
        <Avatar className='w-10 h-10 relative'>
            {/* <AvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}/${user?.image}`} alt="avatar" /> */}
            <AvatarFallback>
                <Image
                    src={"/noavatar.png"}
                    alt="no avatar"
                    width={40}
                    height={40}
                    className="z-10"
                />
            </AvatarFallback>
        </Avatar>
    )
}

export default UserAvatar