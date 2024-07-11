import http from './http';
import { deleteFileByPath } from './fileApi';

export const getAllUsers = async () => {
    const response = await http.get('/users');
    return response.data;
};

export const createUser = async (userData) => {
    const { avatarImage, confirmPassword, ...userDetails } = userData;
    let uploadedImagePath;

    try {
        if (avatarImage) {
            const { data } = await uploadUserImage(avatarImage); 
            uploadedImagePath = data.path;
            userDetails.image = uploadedImagePath;
        }

        const userResp = await http.post('/users', userDetails);
        return userResp.data;
    } catch (error) {
        if (uploadedImagePath) {
            await deleteFileByPath(uploadedImagePath);
        }
        throw error;
    }
};

export const updateUser = async (userData) => {
    let { createdAt, avatarImage, ...userDetails } = userData;

    if (userDetails.image && avatarImage) {
        await deleteFileByPath(userDetails.image);
    }

    if (avatarImage) {
        const {data} = await uploadUserImage(avatarImage); 
        userDetails.image = data.path;
    }
    const response = await http.patch(`/users/${userDetails.id}`, userDetails);
    return response.data;
};

export const updateUserPassword = async ({id}) => {
    const response = await http.get(`/users/changePassword/${id}`);
    return response.data;
};

export const getUserById = async ({id}) => {
    const response = await http.get(`/users/${id}`);
    return response.data;
};

export const deleteUser = async (data) => {

    if (data.image) {
        await deleteFileByPath(data.image);
    }
    
    const response = await http.delete(`/users/${data.id}`);
    return response.data;
};

export const getUserRoleById = async ({id}) => {
    const response = await http.get(`/users/${id}/role`);
    return response.data;
};

export const uploadUserImage = async (avatarImage) => {
    const formData = new FormData();
    formData.append('file', avatarImage);
    formData.append('parentId', '33333333-3333-3333-3333-333333333333');

    const response = await http.post('/files', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });
    return response.data;
};