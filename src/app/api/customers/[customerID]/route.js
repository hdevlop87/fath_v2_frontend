import { NextResponse } from 'next/server';
import { getCustomerById, updateCustomer, deleteCustomer } from '@/controllers/customerController';
import withAuth from '@/lib/withAuth';

export const GET = withAuth(async (req, { params }) => {
    const customerID = params.customerID;

    try {
        const [singleCustomer] = await getCustomerById(customerID);
        if (!singleCustomer) {
            return NextResponse.json({ message: 'Customer not found' }, { status: 404 });
        }
        return NextResponse.json(singleCustomer, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});

export const PATCH = withAuth(async (req, { params }) => {
    const customerID = params.customerID;
    const updatedData = await req.json();

    try {
        const updatedCustomer = await updateCustomer(customerID, updatedData);

        if (!updatedCustomer) {
            return NextResponse.json({ message: 'Customer not found' }, { status: 404 });
        }

        return NextResponse.json({ updatedCustomer, message: 'Customer updated successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}, ['admin']);


export const DELETE = withAuth(async (req, { params }) => {
    const customerID = params.customerID;

    try {
        const deletedCustomer = await deleteCustomer(customerID);

        if (!deletedCustomer) {
            return NextResponse.json({ message: 'Customer not found' }, { status: 404 });
        }
        return NextResponse.json({ deletedCustomer, message: 'Customer deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}, ['admin']);
