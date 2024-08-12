import { create } from 'zustand';
import createSelectors from "./selectors";
import { devtools } from 'zustand/middleware';

interface LoaderState {
   isLoading: boolean;
   queryLoading: boolean;
   setLoading: (loading: boolean) => void;
   setQueryLoading: (loading: boolean) => void;
}

const loaderStore = create<LoaderState>()(
   devtools((set, get) => ({
      isLoading: true,
      queryLoading: false,
      setLoading: (isLoading) => set({ isLoading }),
      setQueryLoading: (queryLoading) => set({ queryLoading }),
   }))
);

export const useLoaderStore = createSelectors(loaderStore);