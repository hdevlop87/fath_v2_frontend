import React, { useEffect } from 'react';
import { useActionsStore } from '@/store/dataTable'
import useDataTableMutations from '@/hooks/useDataTableMutations';

const ManageCallbacks = ({ mutationConfig }) => {

    const setOnCreate = useActionsStore.use.setOnCreate();
    const setOnDelete = useActionsStore.use.setOnDelete();
    const setOnUpdate = useActionsStore.use.setOnUpdate();
    const setOnRead = useActionsStore.use.setOnRead();

    const { onCreate, onRead, onUpdate, onDelete } = useDataTableMutations(mutationConfig);

    useEffect(() => {
        setOnDelete(onDelete);
        setOnUpdate(onUpdate);
        setOnRead(onRead);
        setOnCreate(onCreate);

        return () => {
            setOnDelete(null);
            setOnUpdate(null);
            setOnRead(null);
            setOnCreate(null);
        };
    }, []);

    return null;
};

export default ManageCallbacks;
