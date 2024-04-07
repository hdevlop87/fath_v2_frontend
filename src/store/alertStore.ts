import { create } from 'zustand';
import createSelectors from "./selectors";
import { devtools } from 'zustand/middleware';

interface AlertCommon {
   isOpen: boolean;
   title: string;
   description?: string;
   onConfirm?: () => void;
   onCancel?: () => void;
}

interface AlertState extends AlertCommon {
   setAlertOpen: (alertOpen: boolean) => void;
   setAlert: (data: AlertCommon) => void;
   closeAlert: () => void;
}


const alertStore = create<AlertState>()(
   devtools((set, get) => ({
      isOpen: false,
      title: 'Are you absolutely sure?',
      description: 'This action cannot be undone. This will permanently delete your record and remove your data from our servers.',
      onConfirm: () => { },
      onCancel: () => { },
      setAlertOpen: (isOpen) => set({ isOpen }),

      setAlert: (data) => set({
         isOpen: true,
         title: data.title,
         description: data.title,
         onConfirm: data.onConfirm || null,
         onCancel: data.onCancel || null,
      }),
      closeAlert: () => set({
         isOpen: false,
         title: '',
         onConfirm: null,
         onCancel: null,
      }),
   }))
);


export const useAlertStore = createSelectors(alertStore);