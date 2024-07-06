import http from './http';
import { deleteFileByPath } from './fileApi';

export const getAllSales = async () => {
  const response = await http.get('/sales');
  return response.data;
};

export const getSaleById = async (saleId) => {
  const response = await http.get(`/sales/${saleId}`);
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
    const response = await http.post('/sales/wizard', saleData);
    return response.data;

  } catch (error) {
    if (uploadedImagePath) {
      await deleteFileByPath(uploadedImagePath);
    }
    throw error;
  }

};
 
export const updateSale = async (data) => {
  const response = await http.patch(`/sales/${data.saleId}`, data);
  return response.data;
};

export const deleteSale = async (data) => {
  const response = await http.delete(`/sales/${data.saleId}`);
  return response.data;
};

export const sendEmail = async (data) => {
  const response = await http.post(`sales/agreement/email/${data.saleId}`);
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

export const bulkAddSales = async (data) => {
  const response = await http.post('/sales/bulk-add-csv', data);
  return response.data;
};

export const prepareAgreement = async (data) => {
  const response = await http.get(`sales/agreement/${data.saleId}`);
  return response.data;
};
