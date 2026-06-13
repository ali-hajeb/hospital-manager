import { authMiddleware } from "@/src/lib/authentication/auth";
import User from "@/src/lib/module/user/model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: RouteContext<'/api/auth/[id]'>) {
    try {
        const res = authMiddleware(req, 'MANAGER');
        if (res.status !== 200) {
            return res;
        }
        const { id } = await ctx.params;

        const user = await User.findById(id);
        return NextResponse.json({ code: 200, message: '', user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, ctx: RouteContext<'/api/auth/[id]'>) {
    try {
        const res = authMiddleware(req, 'MANAGER');
        if (res.status !== 200) {
            return res;
        }
        const { id } = await ctx.params;

        const user = await User.findByIdAndDelete(id);
        return NextResponse.json({ code: 200, message: '', user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}
