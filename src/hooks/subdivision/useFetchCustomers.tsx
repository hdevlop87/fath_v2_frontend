"use client"
import { useQuery } from '@tanstack/react-query';
import { getAllCustomers } from '@/services/customersApi';

function useFetchCustomers(enabled = true) {

   const { data, isLoading, isError, refetch } = useQuery({
      queryKey: ['customers'],
      queryFn: async () => {
         try {
            const { data } = await getAllCustomers();
            return data;
         } catch (error) {
            throw error;
         }
      },
      enabled,
      staleTime: 5 * 60 * 1000,

   })

   return { allCustomers: data, isLoading, isError, refetch };
}

export default useFetchCustomers;
