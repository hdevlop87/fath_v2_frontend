import http from './http';
import { queryClient } from '@/providers/QueryClientProvider';
import { deleteFileByPath } from './fileApi';

export const getAllPayments = async () => {
   const response = await http.get(`payments`);
   return response.data;
};

export const getPaymentsBySaleId = async (saleId) => {
   const response = await http.get(`/payments/sale/${saleId}`);
   return response.data;
};

export const getPaymentByID = async (data) => {
   const response = await http.get(`/payments/${data.paymentId}`);
   return response.data;
};

export const createPayment = async (paymentData) => {

   const receipt = paymentData.receipt;
   let uploadedImagePath;

   try {
      if (receipt && receipt instanceof File) {
         const { data } = await uploadPaymentImage(receipt);
         paymentData.receipt = data.path;
      }

      const response = await http.post('/payments/', paymentData);
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

export const updatePayment = async (paymentData) => {

   const receipt = paymentData.receipt;

   if (receipt && receipt instanceof File) {
      const { data } = await uploadPaymentImage(receipt);
      paymentData.receipt = data.path;
   }

   const response = await http.patch(`/payments/${paymentData.paymentId}`, paymentData);
   queryClient.invalidateQueries({ queryKey: ["sales"] });
   return response.data;

};

export const deletePayment = async (data) => {
   const response = await http.delete(`/payments/${data.paymentId}`);
   queryClient.invalidateQueries({ queryKey: ["sales"] });
   return response.data;
};

export const uploadPaymentImage = async (receiptImage) => {
   const formData = new FormData();
   formData.append('file', receiptImage);
   formData.append('parentId', '55555555-5555-5555-5555-555555555555');

   const response = await http.post('/files', formData, {
      headers: {
         'Content-Type': 'multipart/form-data'
      },
   });
   return response.data;
};

export const bulkAddPayments = async (data) => {
   const response = await http.post('/payments/bulk-add-csv', data);
   return response.data;
 };