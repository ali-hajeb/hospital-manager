import '@/src/lib/module/location/model';
import { IAuthorizedRequst, authMiddleware } from "@/src/lib/authentication/auth";
import { NextRequest, NextResponse } from "next/server";
import User from '@/src/lib/module/user/model';

export async function GET(req: NextRequest) {
    try {
        const res = authMiddleware(req);
        if (res.status !== 200) {
            return res;
        }

        const user = await User.findById((req as IAuthorizedRequst).user.id).populate(['location']).select('-password');
        if (!user) {
            return NextResponse.json({ code: 400, message: 'User Not Found' }, { status: 400 });
        }

        return NextResponse.json({ user: { ...user.toObject(), _id: user._id.toString() } }, { status: 200 })
    } catch (error) {
        console.error('[auth/me]',error);
        return NextResponse.json({ code: 0, message: '', data: error }, { status: 400 });
    }
}
