'use client'
import { useQuery } from '@tanstack/react-query';
import { getSaleById } from '@/services/saleApi';
import { usePermissions } from '../auth/usePermissions';

function useFetchSaleById(saleId) {
  const { can } = usePermissions();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['sales', saleId],
    queryFn: async () => {
      try {
        const { data } = await getSaleById(saleId);
        return data;
      } catch (error) {
        throw error;
      }
    },
    enabled: can('read_sale'),
  });

  return { sale: data, isLoading, isError, refetch };
}

export default useFetchSaleById;