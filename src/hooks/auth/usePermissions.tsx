import { useAuthStore } from '@/store/authStore';

export function usePermissions() {
    const user = useAuthStore.use.user();
    const userPermissions = user?.permissions || [];
    const can = (permission) => {
        return userPermissions.includes(permission);
    };

    return { can, userPermissions };
}