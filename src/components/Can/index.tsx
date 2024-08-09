// components/Can.js
import React from 'react';
import { usePermissions } from '@/hooks/auth/usePermissions';
import ErrorPermission from '@/components/Errors/ErrorPermission';

const Can = ({ permission, children }) => {
    const { can } = usePermissions();

    if (!can(permission)) {
        return <ErrorPermission />;
    }

    return <>{children}</>;
};

export default Can;
