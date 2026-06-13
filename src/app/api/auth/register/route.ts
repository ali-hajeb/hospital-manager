import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/lib/database'
import { hashPassword } from '@/src/lib/authentication/auth';
import User from '@/src/lib/module/user/model';

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { firstName, lastName, username, password, location, role = 'ADMIN' } = body;

        const exists = await User.findOne({ username });
        if (exists) {
            return NextResponse.json({ code: 401, message: 'User Exists' }, { status: 401 });
        }

        const user = await User.create({
            firstName,
            lastName,
            username,
            role,
            password: await hashPassword(password),
            location
        });

        await user.populate(['location']);

        // const token = signToken(user._id.toString(), user.role, user.location.toString());
        // const response = NextResponse.json({ code: 200, message: 'Authentication Successful', user }, { status: 200 });
        // setResponseAuthCookie(response, token);
        // return response;
        return NextResponse.json({ code: 200, message: 'Authentication Successful', user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 0, message: '', data: error }, { status: 400 });
    }
}
