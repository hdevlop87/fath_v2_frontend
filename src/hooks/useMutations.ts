import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { queryClient } from '@/providers/QueryClientProvider';
import { useLoaderStore } from '@/store/loaderStore';
import { usePromptStore } from '@/store/promptStore';

export const useMutations = ({ apiMethods, queryKey }) => {

    const setQueryLoading = useLoaderStore.use.setQueryLoading();
    const closePrompt = usePromptStore.use.closePrompt();
    const cleanAction = usePromptStore.use.cleanAction();

    const handleClose = () => {
		closePrompt();
		cleanAction(); 
	};

    const mutationOptions = (apiMethod) => ({
        mutationFn: apiMethod,
        onMutate: () => {
            setQueryLoading(true);
        },
        onSuccess: (data) => {
            toast.success(data?.message || 'Operation successful');
            queryClient.invalidateQueries({ queryKey: [queryKey] });
            setQueryLoading(false);
            handleClose()
        },
        onError: (error) => {
            setQueryLoading(false);
            toast.error(error?.response?.data?.message || 'An error occurred');
            handleClose()
        }
    });

    const createMutation = useMutation(mutationOptions(apiMethods.create));
    const updateMutation = useMutation(mutationOptions(apiMethods.update));
    const deleteMutation = useMutation(mutationOptions(apiMethods.delete));
    const uploadMutation = useMutation(mutationOptions(apiMethods.upload));
    const downloadMutation = useMutation(mutationOptions(apiMethods.download));
    const moveMutation = useMutation(mutationOptions(apiMethods.move));
    const RestoreMutation = useMutation(mutationOptions(apiMethods.restore));

    return { createMutation, updateMutation, deleteMutation, uploadMutation, downloadMutation, moveMutation,RestoreMutation };
};
