"use client"
import { useQuery } from '@tanstack/react-query';
import { getAllCustomers } from '@/services/customersApi';
import { usePermissions } from '../auth/usePermissions';

function useFetchCustomers() {
   
   const { can } = usePermissions();
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
      enabled: can('read_customer'),


   })

   return { allCustomers: data, isLoading, isError, refetch };
}

export default useFetchCustomers;
