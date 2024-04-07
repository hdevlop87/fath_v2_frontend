import { useQuery } from '@tanstack/react-query';
import { getAllExpenses } from '@/services/expenseApi';
import useStore from '@/store/dataStore';

function useFetchExpenses() {
   const setExpenses = useStore(state => state.setExpenses);
   return useQuery({
      queryKey: ['expenses'],
      queryFn: getAllExpenses,
      onSuccess: (expenses) => {
         setExpenses(expenses);
      },
   });
}

export default useFetchExpenses;

