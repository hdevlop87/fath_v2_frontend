import http from './http';

export const getAllFolders = async () => {
    const response = await http.get('/folders');
    return response.data;
};

export const deleteMultiFolders = async (ids, ) => {
    const response = await http.post('/folders/deleteMulti', { ids  });
    return response.data;
};

export const getFoldersByParentId = async (parentId) => {
    const response = await http.get(`/folders/parent/${parentId}`);
    return response.data;
};

//===================== Folder CRUD methods ===============================//

export const createFolder = async (folderData) => {
    const folderResp = await http.post('/folder', folderData);
    return folderResp.data;
};

export const getFolderById = async ({id}) => {
    const response = await http.get(`/folder/${id}`);
    return response.data;
};

export const updateFolder = async (folderData) => {
    const response = await http.patch(`/folder/${folderData.id}`, folderData);
    return response.data;
};

export const deleteFolder = async ({ id }) => { 
    const response = await http.delete(`/folder/${id}`, {
        data: {  },
    });
    return response.data;
};

