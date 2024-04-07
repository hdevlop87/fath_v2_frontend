import jwt from 'jsonwebtoken';
import { sql, eq, and, not } from "drizzle-orm";
import { db } from '@/server/db'
import { users } from '@/server/db/schema';
import validateSchema from '@/server/db/validation';
import { hashPassword, comparePassword } from '@/lib/utils'

const checkUsernameExists = async (username, userID) => {
   let existingUserByUsername;
   if (userID === null) {
      existingUserByUsername = await db.select().from(users).where(eq(users.username, username));
   }

   else {
      existingUserByUsername = await db.select().from(users).where(
         sql`${users.userID} != ${userID} and ${users.username} = ${username}`
      );
   }
   if (existingUserByUsername.length > 0) {
      throw new Error('Username already exists');
   }
};

const checkEmailExists = async (email, userID) => {
   let existingUserByEmail;
   if (userID === null) {
      existingUserByEmail = await db.select().from(users).where(eq(users.email, email));
   } else {
      existingUserByEmail = await db.select().from(users).where(
         and(
            eq(users.email, email),
            not(eq(users.userID, userID))
         )
      );
   }
   if (existingUserByEmail.length > 0) {
      throw new Error('Email already exists');
   }
};
//=========================================================================//
//========================= create User ===================================//
export const createUser = async (userDetail) => {

   await validateSchema('user', userDetail);
   await checkUsernameExists(userDetail.username, null);
   await checkEmailExists(userDetail.email, null);
   const hashedPassword = await hashPassword(userDetail.password);
   const [user] = await db.insert(users).values({
      userID: userDetail.userID,
      name: userDetail.name,
      username: userDetail.username,
      email: userDetail.email,
      password: hashedPassword,
      role: userDetail.role
   }).returning();

   return user.userID;
};
//=========================================================================//
//========================= get user by id ================================//
export const getUserById = async (userID) => {
   return await db.select().from(users).where(eq(users.userID, userID));
};
//========================================================================//
//========================= update user by id ============================//
export const updateUser = async (userID, userDetail) => {
   await checkUsernameExists(userDetail.username, userID);
   await checkEmailExists(userDetail.email, userID);
   userDetail.password = await hashPassword(userDetail.password);

   const [user] = await db.update(users)
      .set(userDetail)
      .where(eq(users.userID, userID))
      .returning();
   return user?.userID;
};
//========================================================================//
//========================= delete user by id ============================//
export const deleteUser = async (userID) => {
   const [user] = await db.delete(users)
      .where(eq(users.userID, userID))
      .returning();
   return user?.userID;
};
//=======================================================================//
//======================= get all Users =================================//
export const getAllUsers = async () => {
   return await db.select().from(users);
}

//=====================================================================//
//======================= remove all Users ============================//
export const deleteAllUsers = async (req, res) => {
   return await db.delete(users);
};

//=====================================================================//
//========================== login user ===============================//
export const loginUser = async (userData) => {

   let { username, password } = userData;

   try {
      const [user] = await db.select().from(users).where(eq(users.username, username));

      if (!user) {
         throw new Error('Invalid username or password.');
      }

      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) {
         throw new Error('Invalid username or password.');
      }

      const tokenPayload = {
         userID: user.id,
         username: user.username,
         role: user.role,
      };

      const accessToken = jwt.sign(tokenPayload, process.env.NEXT_PUBLIC_NEXTAUTH_SECRET, {
         expiresIn: '48h'
      });

      const userForReturn = {
         userID: user.userID,
         name: user.name,
         username: user.username,
         email: user.email,
         role: user.role,
      };

      return {
         ...userForReturn,
         accessToken
      };

   } catch (error) {
      console.log(error);
   }


};

export const getAdminHashedPassword = async (adminUsername) => {
   const [admin] = await db.select(users)
      .from(users)
      .where(and(eq(users.username, adminUsername), eq(users.role, 'admin')));
   if (!admin) {
      throw new Error('Admin not found');
   }
   return admin.password;
};