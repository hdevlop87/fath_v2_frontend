"use client"
import { useQuery } from '@tanstack/react-query';
import { getAllPayments } from '@/services/paymentApi';
import { usePermissions } from '../auth/usePermissions';

function useFetchPayments() {
   const { can } = usePermissions();
   const { data, isLoading, isError, refetch } = useQuery({
      queryKey: ['payments'],
      queryFn: async () => {
         try {
            const response = await getAllPayments();
            return response.data;
         } catch (error) {
            throw error;
         }
      },
      enabled: can('read_payment'),
   });

   return { allPayments: data, isLoading, isError, refetch };
}

export default useFetchPayments;