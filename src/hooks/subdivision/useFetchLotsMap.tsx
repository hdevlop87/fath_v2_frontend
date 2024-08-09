"use client";
import { useQuery } from '@tanstack/react-query';
import { getLotsMap } from '@/services/lotApi';
import { usePermissions } from '../auth/usePermissions';

function useFetchLotsMap() {
  const { can } = usePermissions();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['lotsMap'],
    queryFn: async () => {
      try {
        const response = await getLotsMap();
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    enabled: can('read_lot'),
  });


  return { lotsMap:data, isLoading, isError, refetch, };
}

export default useFetchLotsMap;