import { createUser, getAllUsers, deleteAllUsers } from '@/controllers/userController'
import { NextResponse } from 'next/server';

//====================== Get all users ===========================================//
export const GET = async () => {
   try {
      const users = await getAllUsers()
      return NextResponse.json(users);

   } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
   }
}
//====================== create one User ===========================================//

export const POST = async (req) => {
   const userData = await req.json();

   try {
      const userID = await createUser(userData);
      return NextResponse.json({ message: `User id = ${userID} created successfully ` });

   } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });

   }
}
//====================== delete many Users ===========================================//
export const DELETE = async (req) => {
   try {
      await deleteAllUsers()
      return NextResponse.json({ message: 'All Users have been deleted.' });
   } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
   }
}