"use client"
import { useQuery } from '@tanstack/react-query';
import { getAllExpenses } from '@/services/expenseApi';
import { usePermissions } from '../auth/usePermissions';

function useFetchExpenses() {
   
   const { can } = usePermissions();
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
      enabled: can('read_expense'),
   })

   return { data , isLoading, isError, refetch };
}

export default useFetchExpenses;
