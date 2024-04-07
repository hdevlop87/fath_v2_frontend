import http from './http';

export const getAllCustomers = async () => {
  const response = await http.get(`/customers`);
  return response.data;
};

export const getCustomerByID = async (data) => {
  const response = await http.get(`/customers/${data.customerID}`);
  return response.data;
};

export const createCustomer = async (data) => {
  const response = await http.post(`/customers`, data);
  return response.data;  
};

export const checkCustomer = async (data) => {
  const response = await http.post(`/customers/check`, data);
  return response.data;
};

export const updateCustomer = async (data) => {
  const response = await http.patch(`/customers/${data.customerID}`, data);
  return response.data;
};

export const deleteCustomer = async (data) => {
  const response = await http.delete(`/customers/${data.customerID}`);
  return response.data;
};

export const uploadFileCustomer = async (data) => {
  const response = await http.post(`/customers/uploadFile`, data);
  return response.data;
};

