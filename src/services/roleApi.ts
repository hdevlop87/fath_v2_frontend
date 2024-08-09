import http from './http';

export const getAllRoles = async () => {
  const response = await http.get(`/roles`);
  return response.data;
};

export const bulkAddRoles = async (data) => {
  const response = await http.post('/roles', data);
  return response.data;
};

//===================== Role CRUD methods ===============================//

export const getRoleById = async (data) => {
  const response = await http.get(`/role/${data.roleId}`);
  return response.data;
};

export const createRole = async (data) => { 
  const response = await http.post(`/role`, data);
  return response.data;
};

export const updateRole = async (data) => {
  const response = await http.patch(`/role/${data.roleId}`, data);
  return response.data;
};

export const deleteRole = async (data) => {
  const response = await http.delete(`/role/${data.roleId}`);
  return response.data;
};


 