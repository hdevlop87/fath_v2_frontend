'use client'

import { useEffect } from 'react';
import { navigate } from '../../actions/navigate';
import { useAuth } from '@/hooks/auth/useAuth';

export default function Root() {

    const { userRole } = useAuth();

    useEffect(() => {
        if (userRole) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    }, [userRole]);

    return (
        <div></div>
    )
}