import {create} from 'zustand';
import createSelectors from './selectors';
import { devtools } from 'zustand/middleware';


interface NavigationState {
  parentId?: string;
  setParentId: (parentId: string) => void;
}

const navigationStore = create<NavigationState>()(
    devtools((set) => ({
    parentId: '00000000-0000-0000-0000-000000000000',
    setParentId: (id) => set({ parentId: id }),

  }))
);


export const useNavigationStore = createSelectors(navigationStore);