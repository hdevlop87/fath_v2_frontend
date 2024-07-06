import http from './http';


export const getAllFiles = async () => {
    const response = await http.get('/files');
    return response.data;
};

export const createFile = async (formData) => {
    const fileResp = await http.post('/files', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });
    return fileResp.data;
};

export const updateFile = async (fileData) => {
    const response = await http.patch(`/files/${fileData.id}`, fileData);
    return response.data;
};

export const getFileById = async ({ id }) => {
    const response = await http.get(`/files/${id}`);
    return response.data;
};

export const deleteFile = async ({ id }) => {
    const response = await http.delete(`/files/${id}`);
    return response.data;
};

export const deleteFileByPath = async (filePath) => {
    const response = await http.delete(`/files/byPath`, {
        data: { filePath }
    });
    return response.data;
};

export const deleteMultiFiles = async (ids) => {
    const response = await http.post('/files/deleteMulti', { ids });
    return response.data;
};

export const getFilesByParentId = async (parentId) => {
    const response = await http.get(`/files/parent/${parentId}`);
    return response.data;
};

export const downloadFile = async ({ name, type, id }) => {
    try {
        const response = await http.get(`/files/download/${id}`, {
            responseType: 'blob',
        });
        
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        
        const fileName = name.includes('.') ? name : `${name}.${type}`;
        a.download = fileName;
        
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Download error:', error);
    }
};

export const uploadFile = async (file, parentId, onUploadProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('parentId', parentId || '');
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

export const moveFile = async (data) => {
    const response = await http.post('/files/moveTo', data);
    return response.data;
};


