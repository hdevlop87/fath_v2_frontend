import {create} from 'zustand';

const useStore = create((set) => ({
  formData: {
    customer: {},
    sale: {},
    payment: {}
  },
  setCustomerData: (data) => set((state) => ({ formData: { ...state.formData, customer: data } })),
  setSaleData: (data) => set((state) => ({ formData: { ...state.formData, sale: data } })),
  setPaymentData: (data) => set((state) => ({ formData: { ...state.formData, payment: data } }))
}));

export default useStore;