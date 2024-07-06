import http from './http';


export const getSetting = async () => {
  const response = await http.get(`/settings`);
  return response.data;
};

export const updateSetting = async (data) => {
  const response = await http.patch(`/settings`, data);
  return response.data;
};


 