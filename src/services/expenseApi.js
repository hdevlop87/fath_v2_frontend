import http from './http';

export const getAllExpenses = async () => {
  const response = await http.get(`/expenses`);
  return response.data;
};

export const getExpenseByID = async (data) => {
  const response = await http.get(`/expenses/${data.expenseID}`);
  return response.data;
};

export const createExpense = async (data) => {
  const response = await http.post(`/expenses`, data);
  return response.data;
};

export const updateExpense = async (data) => {
  const response = await http.patch(`/expenses/${data.expenseID}`, data);
  return response.data;
};

export const deleteExpense = async (data) => {
  const response = await http.delete(`/expenses/${data.expenseID}`);
  return response.data;
};

export const uploadFileExpense = async (data) => {
  const response = await http.post(`/expenses/uploadFile`, data);
  return response.data;
};