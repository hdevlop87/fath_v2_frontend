'use client'
import { useQuery } from '@tanstack/react-query';
import { getSaleById } from '@/services/saleApi';

function useFetchSaleById(saleId) {
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
  });

  return { sale: data, isLoading, isError, refetch };
}

export default useFetchSaleById;