import { create } from 'zustand';

interface LoaderState {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useLoaderStore = create<LoaderState>((set) => ({
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
}));