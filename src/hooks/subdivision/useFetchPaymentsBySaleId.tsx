"use client"
import { useQuery } from '@tanstack/react-query';
import { getPaymentsBySaleId } from '@/services/paymentApi';

function useFetchPaymentsBySaleId(saleId) {
   const { data, isLoading, isError, refetch } = useQuery({
      queryKey: ['payments', saleId],
      queryFn: async () => {
         try {
            const response = await getPaymentsBySaleId(saleId);
            return response.data;
         } catch (error) {
            throw error;
         }
      },
      enabled: !!saleId, 
   });

   return { payments: data, isLoading, isError, refetch };
}

export default useFetchPaymentsBySaleId;