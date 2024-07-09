import { useRouter } from 'next/navigation';
import { useMutations } from '@/hooks/useMutations';
import { usePromptStore } from '@/store/promptStore';
import configMapping from '@/config';
import { queryClient } from '@/providers/QueryClientProvider';

const useActionsManager = (target) => {

  if (!target || !configMapping[target]) {
    console.log(`Unknown target: ${target}`);
    return {};
  }

  const router = useRouter();
  const { deleteMutation, createMutation, updateMutation, downloadMutation, uploadMutation, moveMutation, RestoreMutation } = useMutations(configMapping[target].mutationConfig);
  const setPrompt = usePromptStore.use.setPrompt();

  const actionNames = {
    Create: 'Create',
    Update: 'Update',
    Rename: 'Rename',
    Delete: 'Delete',
    Upload: 'Upload',
    Read: 'Read',
    Move: 'Move',
    Star: 'Star',
    Share: 'Share',
    Download: 'Download',
    Preview: 'Preview',
    Restore: 'Restore',
    Crop: 'Crop',
  };

  const handleAction = (actionName, data, options = {}) => {
    setPrompt({
      isOpen: true,
      actionName,
      target,
      initialValues: data || null,
      ...options,
    });
  };

  const createAction = (data) => {
    handleAction(actionNames.Create, null, {
      showButtons: target != "wizardSale",
      onSubmit: (formData) => createMutation.mutate(formData),
    });
  };

  const updateAction = (data) => {
    handleAction(actionNames.Update, data, {
      onSubmit: (newItem) => updateMutation.mutate(newItem),
    });
  };

  const renameAction = (data) => {
    handleAction(actionNames.Rename, data, {
      onSubmit: (formData) => updateMutation.mutate(formData),
    });
  };

  const deleteAction = (data) => {
    const description = `This action cannot be undone. This will permanently delete your ${target} and remove your data from our servers.`
    handleAction(actionNames.Delete, null, {
      showHeader: false,
      submitButtonVariant: 'destructive',
      showCloseIcon: false,
      title: 'Are you absolutely sure?',
      description: description,
      onSubmit: () => {
        deleteMutation.mutate(data);
      },
    });
  };

  const uploadAction = (data) => {
    handleAction(actionNames.Upload, null, {
      showHeader: false,
      showButtons: false,
      showCloseIcon: false,
      onSubmit: (newItem) => uploadMutation.mutate(newItem),
    });
  };

  const readAction = (data) => {
    queryClient.invalidateQueries({ queryKey: ["folders"] });
    queryClient.invalidateQueries({ queryKey: ["files"] });
    router.push(`/storage/${data.id}`);
  };

  const previewAction = (data) => {
    const { Preview } = data
    if (typeof Preview === 'string') {
      router.push(Preview)
      return
    }
    handleAction(actionNames.Preview, data, {
      showButtons: false,
      showCloseIcon: false,
    });
  };

  const downloadAction = async (data) => {
    downloadMutation.mutate(data);
  };

  const moveAction = (data) => {
    handleAction(actionNames.Move, data, {
      onSubmit: (formData) => moveMutation.mutate(formData),
    });
  };

  const starAction = (item) => {

  };

  const cropAction = (data) => {
    handleAction(actionNames.Crop, data, {
      onSubmit: (formData) => updateMutation.mutate(formData),
    });
  };

  const restoreAction = (data) => {
    handleAction(actionNames.Restore, null, {
      showHeader: false,
      showCloseIcon: false,
      title: 'Are you sure you want to restore?',
      description: `This will restore your ${target} from the Trash. Your ${target} will be moved back to its original location.`,
      onSubmit: () => {
        RestoreMutation.mutate(data);
      },
    });
  };

  return {
    Create: createAction,
    Update: updateAction,
    Rename: renameAction,
    Delete: deleteAction,
    Upload: uploadAction,
    Read: readAction,
    Move: moveAction,
    Star: starAction,
    Download: downloadAction,
    Preview: previewAction,
    Restore: restoreAction,
    Crop: cropAction
  };
};

export default useActionsManager;
