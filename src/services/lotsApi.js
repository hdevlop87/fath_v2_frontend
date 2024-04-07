import http from './http';

export const getAllLots = async () => {
  const response = await http.get(`/lots`);
  return response.data;
};

export const getLotByID = async (data) => {
  const response = await http.get(`/lots/${data.lotID}`);
  return response.data;
};

export const createLot = async (data) => { 
  const response = await http.post(`/lots`, data);
  return response.data;
};

export const updateLot = async (data) => {
  const response = await http.patch(`/lots/${data.lotID}`, data);
  return response.data;
};

export const deleteLot = async (data) => {
  const response = await http.delete(`/lots/${data.lotID}`);
  return response.data;
};

export const uploadFileLot = async (data) => {
  const response = await http.post(`/lots/uploadFile`, data);
  return response.data;
};