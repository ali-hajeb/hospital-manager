import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/src/lib/database'
import { setResponseAuthCookie, signToken, verifyPassword } from '@/src/lib/authentication/auth';
import User from '@/src/lib/module/user/model';

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { username, password } = body;

        const user = await User.findOne({ username });
        if (!user || !(await verifyPassword(password, user.password))) {
            return NextResponse.json({ code: 401, message: 'Authentication Failed' }, { status: 401 });
        }

        const token = signToken(user._id.toString(), user.role, user.location.toString());
        console.log(token)
        const response = NextResponse.json({ code: 200, message: 'Authentication Successful', user },
            { status: 200, headers: { "Cache-Control": "no-store"}});
        setResponseAuthCookie(response, token);
        return response;
    } catch (error) {
        return NextResponse.json({ code: 0, message: '', data: error }, { status: 400 });
    }
}
