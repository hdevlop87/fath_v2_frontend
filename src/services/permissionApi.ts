import http from './http';

export const getAllPermissions = async () => {
  const response = await http.get(`/permissions`);
  return response.data;
};

export const bulkAddPermissions = async (data) => {
  const response = await http.post('/permissions', data);
  return response.data;
};

//===================== Permission CRUD methods ===============================//

export const getPermissionById = async (data) => {
  const response = await http.get(`/permission/${data.permissionId}`);
  return response.data;
};

export const createPermission = async (data) => { 
  const response = await http.post(`/permission`, data);
  return response.data;
};

export const updatePermission = async (data) => {
  const response = await http.patch(`/permission/${data.permissionId}`, data);
  return response.data;
};

export const deletePermission = async (data) => {
  const response = await http.delete(`/permission/${data.permissionId}`);
  return response.data;
};


 