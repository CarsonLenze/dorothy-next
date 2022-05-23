import { NextRequest, NextResponse } from "next/server";

export default async function middleware() {
    const resp = NextResponse.next();
    resp.headers.append("Set-Cookie", "cookie1=val1");
    resp.headers.append("Set-Cookie", "cookie2=val2");
    return resp;
}