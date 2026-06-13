import { NextResponse } from "next/server";
import { clearResponseAuthCookie } from "@/src/lib/authentication/auth";

export async function POST() {
    const res = NextResponse.json({ code: 200, message: "Logged out" } , {status: 200});
    clearResponseAuthCookie(res);
    return res;
}
