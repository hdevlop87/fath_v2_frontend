import { create } from 'zustand';
import createSelectors from "./selectors";
import { devtools } from 'zustand/middleware';

interface FormCommon {
   isOpen: boolean;
   title: string;
   initialValues?: any;
   onSubmit?: (values: any) => void;
   onClose?: () => void;
   isEditing?: boolean; 
}

interface FormState extends FormCommon {
   setFormOpen: (formOpen: boolean) => void;
   setForm: (data: FormCommon) => void;
   closeForm: () => void;
}

const formStore = create<FormState>()(
   devtools((set, get) => ({
      isOpen: false,
      title: 'Form Title',
      initialValues: {},
      onSubmit: () => { },
      onClose: () => { },
      isEditing: false, 
      setFormOpen: (isOpen) => set({ isOpen }),

      setForm: (data) => set({
         isOpen: true,
         title: data.title,
         initialValues: data.initialValues || {},
         onSubmit: data.onSubmit || null,
         onClose: data.onClose || null,
         isEditing: data.isEditing || false, 
      }),
      closeForm: () => set({
         isOpen: false,
         title: '',
         initialValues: {},
         onSubmit: null,
         onClose: null,
         isEditing: false, 
      }),
   }))
);

export const useFormStore = createSelectors(formStore);
