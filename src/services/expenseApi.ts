import http from './http';
import { queryClient } from '@/providers/QueryClientProvider';
import { deleteFileByPath } from './fileApi';

export const getAllExpenses = async () => {
   const response = await http.get(`/expenses`);
   return response.data;
};

export const bulkAddExpenses = async (data) => {
   const response = await http.post('/expenses', data);
   return response.data;
};

//===================== Expense CRUD methods ===============================//

export const createExpense = async (expenseData) => {
   const receipt = expenseData.receipt;
   let uploadedImagePath;

   try {
      if (receipt && receipt instanceof File) {
         const { data } = await uploadExpenseImage(receipt);
         expenseData.receipt = data.path;
      }

      const response = await http.post('/expense', expenseData);
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

export const getExpenseByID = async (data) => {
   const response = await http.get(`/expense/${data.expenseID}`);
   return response.data;
};

export const updateExpense = async (expenseData) => {

   const receipt = expenseData.receipt;

   if (receipt && receipt instanceof File) {
      const { data } = await uploadExpenseImage(receipt);
      expenseData.receipt = data.path;
   }

   const response = await http.patch(`/expense/${expenseData.expenseId}`, expenseData);
   queryClient.invalidateQueries({ queryKey: ["sales"] });
   return response.data;

};

export const deleteExpense = async (data) => {
   const response = await http.delete(`/expense/${data.expenseId}`);
   return response.data;
};

//=======================================================================//

export const uploadExpenseImage = async (receiptImage) => {
   const formData = new FormData();
   formData.append('file', receiptImage);
   formData.append('parentId', process.env.NEXT_PUBLIC_EXPENSES_FOLDER_ID);

   const response = await http.post('/file', formData, {
      headers: {
         'Content-Type': 'multipart/form-data'
      },
   });
   return response.data;
};

