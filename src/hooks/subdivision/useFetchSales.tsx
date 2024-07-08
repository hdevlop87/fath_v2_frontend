'use client'
import { useQuery } from '@tanstack/react-query';
import { getAllSales } from '@/services/saleApi';

function useFetchSales(enabled= true) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['sales'],
    queryFn: async () => {
      try {
        const { data } = await getAllSales();
        return data;
      } catch (error) {
        throw error;
      }
    },
    enabled,
    staleTime: 5 * 60 * 1000,
  });

  const getSaleById = (id) => {
    if (!data) return null;
    return data.find(sale => sale.saleId === id);
  };

  return { data, isLoading, isError, refetch, getSaleById };
}

export default useFetchSales;