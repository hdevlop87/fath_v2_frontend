"use client"
import { useQuery } from '@tanstack/react-query';
import { getAllExpenses } from '@/services/expenseApi';

function useFetchExpenses() {

   const { data, isLoading, isError, refetch } = useQuery({
      queryKey: ['expenses'],
      queryFn: async () => {
         try {
            const {  data } = await getAllExpenses();
            return data;
         } catch (error) {
            throw error;
         }
      },
      staleTime: 5 * 60 * 1000,
   })

   return { data , isLoading, isError, refetch };
}

export default useFetchExpenses;
