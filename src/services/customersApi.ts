import http from './http';
import { deleteFileByPath } from './fileApi';

export const getAllCustomers = async () => {
    const response = await http.get('/customers');
    return response.data;
};

export const bulkAddCustomers = async (data) => {
    const response = await http.post('/customers', data);
    return response.data;
};

//===================== Customer CRUD methods ===============================//

export const createCustomer = async (customerData) => {
    const { avatarImage, ...customerDetails } = customerData;
    let uploadedImagePath;

    try {
        if (avatarImage) {
            const { data } = await uploadCustomerImage(avatarImage);
            uploadedImagePath = data.path;
            customerDetails.image = uploadedImagePath;
        }

        const customerResp = await http.post('/customer', customerDetails);
        return customerResp.data;
    } catch (error) {
        if (uploadedImagePath) {
            await deleteFileByPath(uploadedImagePath);
        }
        throw error;
    }
};

export const getCustomerById = async ({ customerId }) => {
    const response = await http.get(`/customer/${customerId}`);
    return response.data;
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
    const response = await http.patch(`/customer/${customerDetails.customerId}`, customerDetails);
    return response.data;
};

export const deleteCustomer = async (data) => {

    if (data.image) {
        await deleteFileByPath(data.image);
    }

    const response = await http.delete(`/customer/${data.customerId}`);
    return response.data;
};

//===========================================================================//

export const uploadCustomerImage = async (avatarImage) => {
    const formData = new FormData();
    formData.append('file', avatarImage);
    formData.append('parentId', process.env.NEXT_PUBLIC_CUSTOMERS_FOLDER_ID);

    const response = await http.post('/file', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });
    return response.data;
};


