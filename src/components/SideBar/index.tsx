// Sidebar.jsx
'use client'

import React from 'react';
import Wrapper from './wrapper'
import Links from './links'
import Header from './header'
import Footer from './footer'

export default function Sidebar() {

    return (
        <Wrapper >
            <div className='flex flex-col h-full gap-10'>
                <Header />
                <Links />
            </div>
            <Footer />
        </Wrapper>
    );
}
