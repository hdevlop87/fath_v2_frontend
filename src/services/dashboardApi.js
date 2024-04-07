import http from './http';

export const getDashData = async () => {
  const response = await http.get(`/dashData`);
  return response.data;
};



