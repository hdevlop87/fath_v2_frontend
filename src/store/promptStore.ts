import { create } from 'zustand';
import createSelectors from './selectors';
import { devtools } from 'zustand/middleware';

interface PromptCommon {
  actionName?: string;
  target?: string;
  data?: any;
  isOpen: boolean;
  initialValues?: any;
  onSubmit?: (data: any) => void;
  showHeader?: boolean;
  submitButtonVariant?: string;
  showButtons?: boolean;
  showCloseIcon?: boolean;
  promptType: 'form' | 'message'; 
  title?: string;
  description?: string;
  warning?: string;
}

interface PromptState extends PromptCommon {
  setPrompt: (params: Partial<PromptCommon>) => void;
  closePrompt: () => void;
  setActionFired: (actionName: string, target: string, data?: any) => void;
  cleanAction: () => void;
}

const promptStore = create<PromptState>()(
  devtools((set) => ({
    isOpen: false,
    actionName: '',
    target: '',
    data: {},
    initialValues: null,
    onSubmit: null,
    showHeader: true, 
    submitButtonVariant: 'default', 
    showButtons: true, 
    showCloseIcon: true,
    promptType: 'form',
    title: '',
    description: '',
    warning: '',

    setActionFired: (actionName, target, data = {}) => set({ actionName, target, data }),
    cleanAction: () => set({ actionName: '', target: '', data: {} }),

    setPrompt: (params) => set({
      isOpen: params.isOpen ?? true,
      promptType: params.promptType ?? 'form',
      actionName: params.actionName || '',
      target: params.target || '',
      initialValues: params.initialValues || null,
      onSubmit: params.onSubmit || null,
      showHeader: params.showHeader !== undefined ? params.showHeader : true, 
      submitButtonVariant: params.submitButtonVariant || 'default', 
      showButtons: params.showButtons !== undefined ? params.showButtons : true, 
      showCloseIcon: params.showCloseIcon !== undefined ? params.showCloseIcon : true,
      title: params.title || '',
      description: params.description || '',
      warning: params.warning || '',
    }),

    closePrompt: () => set({
      isOpen: false,
      initialValues: null,
      onSubmit: null,
    }),
  }))
);

export const usePromptStore = createSelectors(promptStore);
