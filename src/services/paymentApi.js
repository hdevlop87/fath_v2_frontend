import http from './http';

export const getAllPayments = async () => {
  const response = await http.get(`payments`);
  return response.data;
};

export const getPaymentsBySaleId = async ({queryKey}) => {
  const [_key, saleID] = queryKey; 
  const response = await http.get(`/payments/perSaleID/${saleID}`);
  return response.data;
};

export const getPaymentByID = async (data) => {
  const response = await http.get(`/payments/${data.paymentID}`);
  return response.data;
};

export const createPayment = async (data) => {
  const response = await http.post(`payments`, data);
  return response.data;
};

export const updatePayment = async (data) => {
  const response = await http.patch(`/payments/${data.paymentID}`, data);
  return response.data;
};

export const deletePayment = async (data) => {
  const response = await http.delete(`/payments/${data.paymentID}`);
  return response.data;
};

