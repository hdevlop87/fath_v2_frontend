// Sidebar.jsx
'use client'

import React from 'react';
import Wrapper from './wrapper'
import Links from './links'
import Header from './header'
import Footer from './footer'
import { usePathname } from 'next/navigation';

export default function Sidebar() {

    const pathname = usePathname();
    const strippedPathname = pathname.replace(/^\/[a-z]{2}(?=\/)|^\/[a-z]{2}$/, '');

    return (
        <Wrapper >
            <div className='flex flex-col h-full gap-10'>
                <Header />
                <Links pathname={strippedPathname} />
            </div>
            <Footer pathname={strippedPathname}/>
        </Wrapper>
    );
}
