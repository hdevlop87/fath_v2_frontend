"use client"
import { useQuery } from '@tanstack/react-query';
import { getAllPayments } from '@/services/paymentApi';

function useFetchPayments() {
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
      staleTime: 5 * 60 * 1000,
   });

   return { allPayments: data, isLoading, isError, refetch };
}

export default useFetchPayments;