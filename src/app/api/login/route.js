import { loginUser } from '@/controllers/userController'
import { NextResponse } from 'next/server';

//====================== create one User ===========================================//

export const POST = async (req) => {
    const userData = await req.json();
    try {
        const user = await loginUser(userData);
        return NextResponse.json({ user});

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });

    }
}