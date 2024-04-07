import { useQuery } from '@tanstack/react-query';
import { getAllLots } from '@/services/lotsApi';
import useStore from '@/store/dataStore';


function useFetchLots() {
   const setAvailableLots = useStore(state => state.setAvailableLots);

   return useQuery({
      queryKey: ['lots'],
      queryFn: getAllLots,
      onSuccess: (lots) => {
         const availableLots = lots.filter((lot: any) => lot.status === "Available");
         setAvailableLots(availableLots);
      },
   })
}

export default useFetchLots;