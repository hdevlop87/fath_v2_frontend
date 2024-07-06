import { create } from 'zustand';

type FormData = {
  sale: Record<string, any>;
  customer: Record<string, any>;
  payment: Record<string, any>;
};

type FormStoreState = {
  formData: FormData;
  setFormData: (step: keyof FormData, data: Record<string, any>) => void;
  getFormData: (step: keyof FormData) => Record<string, any>;
  resetFormData: () => void;
};

const useFormStore = create<FormStoreState>((set, get) => ({
  formData: {
    sale: {},
    customer: {},
    payment: {},
  },
  setFormData: (step, data) => set((state) => ({
    formData: {
      ...state.formData,
      [step]: data,
    },
  })),
  getFormData: (step) => get().formData[step],
  resetFormData: () => set({
    formData: {
      sale: {},
      customer: {},
      payment: {},
    },
  }),
}));

export default useFormStore;
