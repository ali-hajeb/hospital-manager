import Location from "@/src/lib/module/location/model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: RouteContext<'/api/location/[id]'>) {
    try {
        const { id } = await ctx.params;

        const location = await Location.findById(id);
        return NextResponse.json({ code: 200, message: '', location }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, ctx: RouteContext<'/api/location/[id]'>) {
    try {
        const { id } = await ctx.params;

        const location = await Location.findByIdAndDelete(id);
        return NextResponse.json({ code: 200, message: '', location }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}
