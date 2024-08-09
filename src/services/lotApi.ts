import http from './http';

export const getAllLots = async () => {
  const response = await http.get(`/lots`);
  return response.data;
};

export const bulkAddLots = async (data) => {
  const response = await http.post('/lots', data);
  return response.data;
};

export const getLotsMap = async () => {
  const response = await http.get(`/lots/map`);
  return response.data;
};

export const getLotsMapLandingPage = async () => {
  const response = await http.get(`/lots/landingPage`);
  return response.data;
};

//===================== Lot CRUD methods ===============================//

export const getLotById = async (data) => {
  const response = await http.get(`/lot/${data.lotId}`);
  return response.data;
};

export const createLot = async (data) => { 
  const response = await http.post(`/lot`, data);
  return response.data;
};

export const updateLot = async (data) => {
  const response = await http.patch(`/lot/${data.lotId}`, data);
  return response.data;
};

export const deleteLot = async (data) => {
  const response = await http.delete(`/lot/${data.lotId}`);
  return response.data;
};


 