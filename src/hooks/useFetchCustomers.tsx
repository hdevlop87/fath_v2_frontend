import { useQuery } from '@tanstack/react-query';
import { getAllCustomers } from '@/services/customerApi';
import useStore from '@/store/dataStore';

function useFetchCustomers() {
   const setCustomers = useStore(state => state.setCustomers);
   return useQuery({
      queryKey: ['customers'],
      queryFn: getAllCustomers,
      onSuccess: (customers) => {
         setCustomers(customers);
      },
   })
}

export default useFetchCustomers;
