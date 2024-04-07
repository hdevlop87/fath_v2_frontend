import { NextResponse } from 'next/server';
import { getUserById, updateUser, deleteUser } from '@/controllers/userController'

export const GET = async (req, { params }) => {
    const userID = params.userID;
    try {
        const [singleUser] = await getUserById(userID);
        if (!singleUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 500 });
        }
        return NextResponse.json(singleUser, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};

export const PATCH = async (req, { params }) => {
    const userID = params.userID;
    const updatedData = await req.json();
    try {
        const updatedUser = await updateUser(userID, updatedData);

        if (!updatedUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 500 });
        }

        return NextResponse.json({ updatedUser, message: 'User updated successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};

export const DELETE = async (req, { params }) => {
    const userID = params.userID;
    try {
        const deletedUser = await deleteUser(userID);

        if (!deletedUser) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ deletedUser, message: 'User deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};


