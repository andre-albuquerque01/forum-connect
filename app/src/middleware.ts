import { type NextRequest, NextResponse } from 'next/server'
import verifyToken from './data/verify-token'

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const authentication = token ? await verifyToken(token) : false

    if (
        (!authentication && (request.nextUrl.pathname.endsWith('user/update') ||
            request.nextUrl.pathname.startsWith('threads/new') ||
            request.nextUrl.pathname.endsWith('threads/new') ||
            request.nextUrl.pathname.startsWith('threads/get/') ||
            request.nextUrl.pathname.endsWith('user')
        ))
    ) {
        return NextResponse.redirect(new URL('/user/login', request.url))
    }

    if (
        authentication && (request.nextUrl.pathname.startsWith('user/login') ||
            request.nextUrl.pathname.startsWith('user/create-account') ||
            request.nextUrl.pathname.startsWith('user/recover-password')
        )
    ) {
        return NextResponse.redirect(new URL('/threads', request.url))
    }

    return NextResponse.next()
}