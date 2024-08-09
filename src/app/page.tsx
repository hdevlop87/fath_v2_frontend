'use client'

import { useEffect } from 'react';
import { navigate } from '../../actions/navigate';

export default function Root() {

    useEffect(() => {
        navigate('/dashboard');
    }, []);

    return (
        <div></div>
    )
}