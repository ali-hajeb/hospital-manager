import "server-only";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import dbConnect from "@/src/lib/database";
import IJwtPayload from '@/src/common/types/jwt.types';
import User from '@/src/lib/module/user';

const JWT_SEC = process.env.JWT_SEC!;

export default async function getServerSession() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth')?.value;
        if (!token) {
            return null;
        }

        await dbConnect();
        const tokenPayload = jwt.verify(token, JWT_SEC) as IJwtPayload;
        const user = await User.findById(tokenPayload.id).select('-password');
        console.log(user);
        return user ? { ...user.toObject(), _id: user._id.toString() } : null;
    } catch (error) {
        return null;
    }
}
