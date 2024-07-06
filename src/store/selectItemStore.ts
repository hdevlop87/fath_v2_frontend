import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import createSelectors from "./selectors";

interface SelectedItemsState {
    selectedItems: any[];
    toggleItemSelection: (item: any) => void;
    selectAllItems: (items: any[]) => void;
    clearSelection: () => void;
}

const selectedItemsStore = create<SelectedItemsState>()(
    devtools((set) => ({
        selectedItems: [],
        toggleItemSelection: (item) => set((state) => {
            const isSelected = state.selectedItems.includes(item);
            if (isSelected) {
                return { selectedItems: state.selectedItems.filter(i => i !== item) };
            } else {
                return { selectedItems: [...state.selectedItems, item] };
            }
        }),
        selectAllItems: (items) => set({ selectedItems: items }),
        clearSelection: () => set({ selectedItems: [] }),
    }))
);

export const useSelectStore = createSelectors(selectedItemsStore);

