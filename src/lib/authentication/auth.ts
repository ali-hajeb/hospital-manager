import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from 'next/server';
import { UserRole } from '../module/user';
import IJwtPayload from '@/src/common/types/jwt.types';

const JWT_SEC = process.env.JWT_SEC!;

export async function hashPassword(pw: string) {
    return bcrypt.hash(pw, 12);
}

export async function verifyPassword(pw: string, hash: string) {
    return bcrypt.compare(pw, hash);
}

export function signToken(id: string, role: string, location: string) {
    return jwt.sign({ id, role, location }, JWT_SEC, { expiresIn: "7d" });
}

export async function setAuthCookie(token: string) {
    const cookieStore = await cookies();
    cookieStore.set("auth", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
    })
    console.log('store', cookieStore)
}

export async function setResponseAuthCookie(res: NextResponse, token: string) {
    res.cookies.set("auth", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
    })
}

export async function clearAuthCookie() {
    const cookieStore = await cookies();
    cookieStore.delete('auth');
}

export async function clearResponseAuthCookie(res: NextResponse) {
    res.cookies.delete('auth')
}

export interface IAuthorizedRequst extends NextRequest {
    user: {
        id: string;
        role: UserRole;
        location: string;
    }
}

export function authMiddleware(
    req: NextRequest,
    requiredRole?: UserRole
) {
    try {
        const token = req.cookies.get('auth')?.value;
        if (!token) {
            return NextResponse.json({code: 401, message: 'Unauthorized'}, { status: 401 })
        }

        const tokenPayload = jwt.verify(token, JWT_SEC) as IJwtPayload;

        (req as IAuthorizedRequst).user = { id: tokenPayload.id, role: tokenPayload.role, location: tokenPayload.location };

        if (requiredRole && requiredRole !== tokenPayload.role) {
            return NextResponse.json({code: 403, message: 'Access Denied'}, { status: 403 })
        }

        return NextResponse.next();
    } catch (error) {
        return NextResponse.json({code: 401, message: 'Invalid Token'}, { status: 401 })
    }
}
