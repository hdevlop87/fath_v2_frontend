import { useQuery } from '@tanstack/react-query';
import { getAllSales } from '@/services/salesApi';
import useStore from '@/store/dataStore';

function useFetchSales() {
   const setSales = useStore(state => state.setSales);

   return useQuery({
      queryKey: ['sales'],
      queryFn: getAllSales,
      onSuccess: (sales) => {
         setSales(sales);
      },
   });
}

export default useFetchSales;