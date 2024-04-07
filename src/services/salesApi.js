import http from './http';
import axios from 'axios';

export const getAllSales = async () => {
  const response = await http.get('/sales');
  return response.data;
};

export const getSaleByID = async (saleID) => {
  const response = await http.get(`/sales/${saleID}`);
  return response.data;
};

export const createSale = async (data) => {
  const response = await http.post('/sales', data);
  return response.data;
};

export const updateSale = async (data) => {
  const response = await http.patch(`/sales/${data.saleID}`, data);
  return response.data;
};

export const deleteSale = async (data) => {
  const response = await http.delete(`/sales/${data.saleID}`);
  return response.data;
};

export const getAgreementByData = async (data) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/sales/agreement`, data, { responseType: 'blob' });
  return new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
};

export const sendEmail = async (data) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/sales/agreement/email`, data);
  return response.data; 
};
