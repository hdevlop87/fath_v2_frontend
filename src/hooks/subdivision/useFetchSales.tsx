'use client'
import { useQuery } from '@tanstack/react-query';
import { getAllSales } from '@/services/saleApi';
import { usePermissions } from '../auth/usePermissions';

function useFetchSales() {
  const { can } = usePermissions();
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
    enabled: can('read_sale'),
  });

  const getSaleById = (id) => {
    if (!data) return null;
    return data.find(sale => sale.saleId === id);
  };

  return { data, isLoading, isError, refetch, getSaleById };
}

export default useFetchSales;