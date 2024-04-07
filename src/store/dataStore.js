import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultCustomer = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    CIN: ''
};

const defaultLot = {
    lotRef: '',
    status: 'Available',
    size: '',
    price: '',
    address: '',
    zoningCode: ''
};

const defaultSale = {
    lotRef: '',
    pricePerM2: '',
    date: null,
    status: 'Initiated',
    isActif: true
};

const defaultExpense = {
    amount: 0,
    date: null,
    paymentMethod: '',
    paymentReference: '',
    paymentImage: '',
    notes: ''
};


const defaultPayment = {
    amount: '',
    date: null,
    method: '',
    paymentReference: '',
    receipt: null,
    notes: ''
};

const useStore = create(
    persist(
        (set) => ({
            formData: {
                customer: defaultCustomer,
                sale: defaultSale,
                lot: defaultLot,
                payment: defaultPayment,
                expense: defaultExpense
            },
            availableLots: [],
            availablePayments: [],
            customers: [],
            sales: [],
            expenses: [],
            financialData: {},
            lowPercentSales: [],
            paymentsByYear: [],

            setPaymentsByYear: (items) => set(() => ({
                paymentsByYear: items
            })),

            setLowPercentSales: (items) => set(() => ({
                lowPercentSales: items
            })),

            setFinancialData: (items) => set(() => ({
                financialData: items
            })),

            setExpenseData: (data) => set(state => ({
                formData: { ...state.formData, expense: data }
            })),

            setCustomerData: (data) => set(state => ({
                formData: { ...state.formData, customer: data }
            })),

            setSaleData: (data) => set(state => ({
                formData: { ...state.formData, sale: data }
            })),

            setLotData: (data) => set(state => ({
                formData: { ...state.formData, lot: data }
            })),

            setPaymentData: (data) => set((state) => ({
                formData: { ...state.formData, payment: data }
            })),

            setAvailableLots: (items) => set(() => ({
                availableLots: items
            })),

            setAvailablePayments: (items) => set(() => ({
                availablePayments: items
            })),

            setCustomers: (items) => set(() => ({
                customers: items
            })),

            setSales: (items) => set(() => ({
                sales: items
            })),

            setExpenses: (items) => set(() => ({
                expenses: items
            })),

            resetAllFormData: () => set({
                formData: {
                    customer: defaultCustomer,
                    sale: defaultSale,
                    lot: defaultLot,
                    payment: defaultPayment,
                    expense: defaultExpense,
                }
            }),
            resetFormData: (type) => {
                switch (type) {
                    case 'customer':
                        return set(state => ({ formData: { ...state.formData, customer: defaultCustomer } }));
                    case 'sale':
                        return set(state => ({ formData: { ...state.formData, sale: defaultSale } }));
                    case 'lot':
                        return set(state => ({ formData: { ...state.formData, lot: defaultLot } }));
                    case 'payment':
                        return set(state => ({ formData: { ...state.formData, payment: defaultPayment } }));
                    case 'expense':
                        return set(state => ({ formData: { ...state.formData, expense: defaultExpense } }));
                    default:
                        console.warn('Invalid type provided to resetFormData');
                        break;
                }
            },
        }),
        {
            name: 'data-store',
            skipHydration: true,
        }
    )
);

export default useStore;
