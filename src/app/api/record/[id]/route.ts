import Record from "@/src/lib/module/record/model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: RouteContext<'/api/record/[id]'>) {
    try {
        const { id } = await ctx.params;

        const record = await Record.findById(id).populate(['location']);
        return NextResponse.json({ code: 200, message: '', record }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, ctx: RouteContext<'/api/record/[id]'>) {
    try {
        const { id } = await ctx.params;

        const record = await Record.findByIdAndDelete(id);
        return NextResponse.json({ code: 200, message: '', record }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ code: 400, message: '', data: error}, { status: 400 });
    }
}
