'use client'
import React from 'react';
import { ThemeToggle } from './theme-toggle';
import LangToggle from './Lang-toggle'
import UserAvatar from './UserAvatar';
import Segment from './segment'

export  function Navbar() {

    return (
        <div className='flex h-[56px] justify-between items-center w-full '>
            <Segment />
            <div className='flex items-center gap-3'>
                <ThemeToggle />
                <LangToggle />
                <UserAvatar />
            </div>
        </div>
    );
};

