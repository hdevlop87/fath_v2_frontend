import http from './http';
import { deleteFileByPath } from './fileApi';

export const getAllSales = async () => {
  const response = await http.get('/sales');
  return response.data;
};

export const bulkAddSales = async (data) => {
  const response = await http.post('/sales', data);
  return response.data;
};

//===========================================================//

export const getSaleById = async (saleId) => {
  const response = await http.get(`/sale/${saleId}`);
  return response.data;
};

export const createSale = async (saleData) => {
  const receipt = saleData.payment.receipt;
  let uploadedImagePath;

  try {
    if (receipt) {
      const { data } = await uploadPaymentImage(receipt);
      uploadedImagePath = data.path;
      saleData.payment.receipt = uploadedImagePath;
    }
    const response = await http.post('/sale', saleData);
    return response.data;

  } catch (error) {
    if (uploadedImagePath) {
      await deleteFileByPath(uploadedImagePath);
    }
    throw error;
  }
};
 
export const updateSale = async (data) => {
  const response = await http.patch(`/sale/${data.saleId}`, data);
  return response.data;
};

export const deleteSale = async (data) => {
  const response = await http.delete(`/sale/${data.saleId}`);
  return response.data;
};

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

export const prepareAgreement = async (data) => {
  const response = await http.get(`agreement/${data.saleId}`);
  return response.data;
};

export const sendEmail = async (data) => {
  const response = await http.post(`agreement/email/${data.saleId}`);
  return response.data;
};