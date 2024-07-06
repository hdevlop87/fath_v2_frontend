"use client";
import { useQuery } from '@tanstack/react-query';
import { getLotsMap } from '@/services/lotApi';

function useFetchLotsMap() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['lotsMap'],
    queryFn: async () => {
      try {
        const response = await getLotsMap();
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });


  return { lotsMap:data, isLoading, isError, refetch, };
}

export default useFetchLotsMap;