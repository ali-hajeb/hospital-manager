import { hashPassword } from "@/src/lib/authentication/auth";
import { IUser } from "@/src/lib/module/user";
import User from "@/src/lib/module/user/model";
import { escapeRegex } from "@/src/utils/regex";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const { limit = '0', skip = '0', ...query } = Object.fromEntries(searchParams.entries());

        console.log('[get /auth] -> quey:', query, searchParams.entries());
        const conditions = Object.keys(query).map(queryKey => {
            const regex = new RegExp(escapeRegex(query[queryKey]), 'i');
            return { [queryKey]: regex };
        });
        console.log('[get /auth] -> conditions:', conditions);


        const count = await User.countDocuments({ $and: conditions });
        const users = await User.find({ $and: conditions })
            .skip(parseInt(skip) * parseInt(limit))
            .limit(parseInt(limit))
            .populate(['location']);
        return NextResponse.json({ code: 200, message: '', users, count }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { _id, password, ...updatedData } = body as IUser;

        if (password) {
            (updatedData as any).password = await hashPassword(password);
        }

        const user = await User.findByIdAndUpdate(_id, updatedData, { new: true }).populate(['location']);
        return NextResponse.json({ code: 200, message: '', user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

