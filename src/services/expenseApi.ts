import http from './http';
import { queryClient } from '@/providers/QueryClientProvider';
import { deleteFileByPath } from './fileApi';

export const getAllExpenses = async () => {
   const response = await http.get(`/expenses`);
   return response.data;
};

export const getExpenseByID = async (data) => {
   const response = await http.get(`/expenses/${data.expenseID}`);
   return response.data;
};

export const createExpense = async (expenseData) => {
   const receipt = expenseData.receipt;
   let uploadedImagePath;

   try {
      if (receipt && receipt instanceof File) {
         const { data } = await uploadExpenseImage(receipt);
         expenseData.receipt = data.path;
      }

      const response = await http.post('/expenses/', expenseData);
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      return response.data;

   }
   catch (error) {
      if (uploadedImagePath) {
         await deleteFileByPath(uploadedImagePath);
      }
      throw error;
   }
};

export const updateExpense = async (expenseData) => {

   const receipt = expenseData.receipt;

   if (receipt && receipt instanceof File) {
      const { data } = await uploadExpenseImage(receipt);
      expenseData.receipt = data.path;
   }

   const response = await http.patch(`/expenses/${expenseData.expenseId}`, expenseData);
   queryClient.invalidateQueries({ queryKey: ["sales"] });
   return response.data;

};

export const deleteExpense = async (data) => {
   const response = await http.delete(`/expenses/${data.expenseId}`);
   return response.data;
};

export const uploadExpenseImage = async (receiptImage) => {
   const formData = new FormData();
   formData.append('file', receiptImage);
   formData.append('parentId', '44444444-4444-4444-4444-444444444444');

   const response = await http.post('/files', formData, {
      headers: {
         'Content-Type': 'multipart/form-data'
      },
   });
   return response.data;
};

export const bulkAddExpenses = async (data) => {
   const response = await http.post('/expenses/bulk-add-csv', data);
   return response.data;
};