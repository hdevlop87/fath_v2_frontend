import http from './http';
import { queryClient } from '@/providers/QueryClientProvider';
import { deleteFileByPath } from './fileApi';

export const getAllPayments = async () => {
   const response = await http.get(`payments`);
   return response.data;
};

export const bulkAddPayments = async (data) => {
   const response = await http.post('/payments', data);
   return response.data;
 };

export const getPaymentsBySaleId = async (saleId) => {
   const response = await http.get(`/payments/${saleId}`);
   return response.data;
};

//===================== Payment CRUD methods ===============================//

export const getPaymentByID = async (data) => {
   const response = await http.get(`/payment/${data.paymentId}`);
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

      const response = await http.post('/payment/', paymentData);
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

   const response = await http.patch(`/payment/${paymentData.paymentId}`, paymentData);
   queryClient.invalidateQueries({ queryKey: ["sales"] });
   return response.data;

};

export const deletePayment = async (data) => {
   const response = await http.delete(`/payment/${data.paymentId}`);
   queryClient.invalidateQueries({ queryKey: ["sales"] });
   return response.data;
};

//======================================================================//

export const uploadPaymentImage = async (receiptImage) => {
   const formData = new FormData();
   formData.append('file', receiptImage);
   formData.append('parentId', process.env.NEXT_PUBLIC_PAYMENTS_FOLDER_ID);

   const response = await http.post('/file', formData, {
      headers: {
         'Content-Type': 'multipart/form-data'
      },
   });
   return response.data;
};

