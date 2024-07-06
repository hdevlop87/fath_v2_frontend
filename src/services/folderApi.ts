import http from './http';

export const getAllFolders = async () => {
    const response = await http.get('/folders');
    return response.data;
};

export const createFolder = async (folderData) => {
    const folderResp = await http.post('/folders', folderData);
    return folderResp.data;
};

export const updateFolder = async (folderData) => {
    const response = await http.patch(`/folders/${folderData.id}`, folderData);
    return response.data;
};

export const getFolderById = async ({id}) => {
    const response = await http.get(`/folders/${id}`);
    return response.data;
};

export const deleteFolder = async ({ id }) => { 
    const response = await http.delete(`/folders/${id}`, {
        data: {  },
    });
    return response.data;
};

export const getFolderByPath = async (path) => {
    const response = await http.post(`/folders/path`,{path});
    return response.data;
};

export const parsePath = async (parentId) => {
    const response = await http.post(`/folders/parsePath`, {parentId} );
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

export const getFoldersInTrash = async () => {
    const response = await http.get(`/folders/trash`);
    return response.data;
};

export const restoreFolder = async ({ id }) => {
    const response = await http.get(`/folders/restore/${id}`);
    return response.data;
};