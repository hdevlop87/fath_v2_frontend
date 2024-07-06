import http from './http';
import { deleteFileByPath } from './fileApi';

export const getAllCustomers = async () => {
    const response = await http.get('/customers');
    return response.data;
};

export const createCustomer = async (customerData) => {
    const { avatarImage, ...customerDetails } = customerData;
    let uploadedImagePath;

    try {
        if (avatarImage) {
            const { data } = await uploadCustomerImage(avatarImage);
            uploadedImagePath = data.path;
            customerDetails.image = uploadedImagePath;
        }

        const customerResp = await http.post('/customers', customerDetails);
        return customerResp.data;
    } catch (error) {
        if (uploadedImagePath) {
            await deleteFileByPath(uploadedImagePath);
        }
        throw error;
    }
};

export const updateCustomer = async (customerData) => {
    let { createdAt, avatarImage, ...customerDetails } = customerData;

    if (customerDetails.image && avatarImage) {
        await deleteFileByPath(customerDetails.image);
    }

    if (avatarImage) {
        const { data } = await uploadCustomerImage(avatarImage);
        customerDetails.image = data.path;
    }
    const response = await http.patch(`/customers/${customerDetails.customerId}`, customerDetails);
    return response.data;
};

export const getCustomerById = async ({ customerId }) => {
    const response = await http.get(`/customers/${customerId}`);
    return response.data;
};

export const deleteCustomer = async (data) => {

    if (data.image) {
        await deleteFileByPath(data.image);
    }

    const response = await http.delete(`/customers/${data.customerId}`);
    return response.data;
};

export const getCustomerRoleById = async ({ customerId }) => {
    const response = await http.get(`/customers/${customerId}/role`);
    return response.data;
};

export const uploadCustomerImage = async (avatarImage) => {
    const formData = new FormData();
    formData.append('file', avatarImage);
    formData.append('parentId', '66666666-6666-6666-6666-666666666666');

    const response = await http.post('/files', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });
    return response.data;
};

export const checkCustomer = async (data) => {
    const response = await http.post(`/customers/check`, data);
    return response.data;
};

export const bulkAddCustomers = async (data) => {
    const response = await http.post('/customers/bulk-add-csv', data);
    return response.data;
};
