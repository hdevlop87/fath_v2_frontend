import React, { useEffect } from 'react';
import { useSelectStore } from '@/store/selectItemStore';
import { deleteMultiFiles } from '@/services/fileApi';
import { deleteMultiFolders } from '@/services/folderApi';
import { queryClient } from '@/providers/QueryClientProvider';

const useKeyboardShortcuts = (items) => {

    const selectAllItems = useSelectStore(state => state.selectAllItems);
    const selectedItems = useSelectStore(state => state.selectedItems);
    const clearSelection = useSelectStore(state => state.clearSelection);

    useEffect(() => {
        const handleKeyDown = async (event) => {
            if (event.ctrlKey && event.key === 'a') {
                event.preventDefault();
                selectAllItems(items);
            }

            if (event.key === 'Delete') {
                event.preventDefault();
                
                const folderIds = selectedItems
                    .filter(item => item.type === 'folder')
                    .map(item => item.id);

                const fileIds = selectedItems
                    .filter(item => item.type !== 'folder')
                    .map(item => item.id);


                if (folderIds.length > 0) {
                    await deleteMultiFolders(folderIds);
                }
                if (fileIds.length > 0) {
                    await deleteMultiFiles(fileIds);
                }

                queryClient.invalidateQueries({ queryKey: ["files"] });
                queryClient.invalidateQueries({ queryKey: ["folders"] });
                clearSelection();
            }

            if (event.key === 'Escape') {
                event.preventDefault();
                clearSelection();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [items, selectAllItems]);
};

export default useKeyboardShortcuts;
