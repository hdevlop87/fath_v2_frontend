import { useQuery } from '@tanstack/react-query';
import { getSaleByID } from '@/services/salesApi';
import useStore from '@/store/dataStore';

function useFetchSale(saleID: any) {
   const { setCustomerData, setSaleData, setLotData, setAvailablePayments } = useStore();

   return useQuery({
      queryKey: ['sale', saleID], 
      queryFn: () => getSaleByID(saleID),
      onSuccess: (saleData) => {
         setCustomerData(saleData.customer);
         setSaleData(saleData.sale);
         setLotData(saleData.lot);
         setAvailablePayments(saleData.payments);
      },
      enabled: !!saleID 
   })
}

export default useFetchSale;