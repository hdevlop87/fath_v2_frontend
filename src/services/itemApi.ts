import http from './http';

export const getAllItems = async () => {
    const response = await http.get('/items');
    return response.data;
};

export const createItem = async (itemData) => {
    const endpoint = itemData.type === 'folder' ? `/folders` : `/files`;
    const itemResp = await http.post(endpoint, itemData);
    return itemResp.data;
};

export const updateItem = async (itemData) => {
    const endpoint = itemData.type === 'folder' ? `/folders/${itemData.id}` : `/files/${itemData.id}`;
    const response = await http.patch(endpoint, itemData);
    return response.data;
};

export const getItemById = async ({id, type}) => {
    const endpoint = type === 'folder' ? `/folders/${id}` : `/files/${id}`;
    const response = await http.get(endpoint);
    return response.data;
};

export const deleteItem = async ({id, type}) => {
    const endpoint = type === 'folder' ? `/folders/${id}` : `/files/${id}`;
    const response = await http.delete(endpoint);
    return response.data;
};

export const getItems = async (parentId) => {
    const response = await http.get(`/items/${parentId}`);
    return response.data;
};

export const createMultipleFiles = async (files, parentId, onProgress) => {
    const results = [];
    for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('parentId', parentId);
        const response = await http.post('/files', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                if (onProgress) {
                    const { loaded, total } = progressEvent;
                    const percentage = Math.round((loaded * 100) / total);
                    onProgress(file, percentage);
                }
            }
        });
        results.push(response.data);
    }
    return results;
};

export const uploadFile = async (file, onUploadProgress) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await http.post('/files', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: event => {
            const percentage = Math.round((event.loaded * 100) / event.total);
            onUploadProgress(percentage);
        }
    });

    return response.data;
};