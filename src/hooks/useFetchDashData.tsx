'use client'

import { useQuery } from '@tanstack/react-query';
import { getDashData } from '@/services/dashboardApi';
import useStore from '@/store/dataStore';


function useFetchDashData() {
   const setFinancialData = useStore(state => state.setFinancialData);
   const setLowPercentSales = useStore(state => state.setLowPercentSales);
   const setPaymentsByYear = useStore(state => state.setPaymentsByYear);

   return useQuery({
      queryKey: ['dashData'],
      queryFn: getDashData,
      onSuccess: (resp) => {
         setFinancialData(resp.financialData);
         setLowPercentSales(resp.sales);
         setPaymentsByYear(resp.paymentsByYear)
      },
   })
}

export default useFetchDashData;