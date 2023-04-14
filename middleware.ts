import { NextResponse, NextRequest } from "next/server";

const legacyPrefix = ['/auth', '/_next', '/assets', '/api']

export async function middleware(req: NextRequest) {
    // const { pathname } = req.nextUrl;
    // console.log(pathname)

    // if (legacyPrefix.some(prefix => pathname.startsWith(prefix))) {
    //     return NextResponse.next();
    // }
}