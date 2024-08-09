"use client";
import { useQuery } from '@tanstack/react-query';
import { getAllLots } from '@/services/lotApi';
import { usePermissions } from '../auth/usePermissions';

function useFetchLots() {
  
  const { can } = usePermissions();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['lots'],
    queryFn: async () => {
      try {
        const response = await getAllLots();
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    enabled: can('read_lot'),

  });

  const availableLots = data?.filter(lot => lot.status === 'Available') || [];
  const availablelotsRef = availableLots?.map(lot => lot.lotRef) || [];
  const allLotsRef = data?.map(lot => lot.lotRef) || [];

  return { data, isLoading, isError, refetch, availableLots, availablelotsRef, allLots: data,allLotsRef };
}

export default useFetchLots;