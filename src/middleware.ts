import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
//import { NextResponse, NextRequest } from 'next/server';
//import { getToken } from 'next-auth/jwt'; // For NextAuth.js

 /*
 Che the point 3 here:
 https://authjs.dev/getting-started/installation?framework=next-js
 about session refreshing
 */
//import { localesRegExPart } from './lib/constants';
//const localizedUrls = `/(${localesRegExPart})/:path*`;
const intlMiddleware = createMiddleware(routing);
export default intlMiddleware;
// First try to logging, after login / logout ok, handle authorization  with middle ware, and token refreshing
/*
export default async function middleware(req: NextRequest ) {
  
  // 1. NextAuth.js Middleware (Check Authentication FIRST)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    // Redirect to login ONLY if NOT on an auth route. Prevents infinite redirect loop.
    if (!req.nextUrl.pathname.startsWith('/api/auth')) {
      //return NextResponse.redirect(new URL('/login', req.url)); TODO: Ask if actually should be done this, or simple the ui refreshing showing logout status is enough
      // or how to hande the token refreshing
    }
  }

  // 2. next-intl Middleware (Handle Internationalization SECOND)
  const response = intlMiddleware(req);

  // 3. IMPORTANT: Modify the response to allow NextAuth.js to set cookies
  if (response) {
    const authResponse = NextResponse.next();
    const headers = new Headers(authResponse.headers);

    // Get the headers from intlMiddleware response
    const intlHeaders = new Headers(response.headers);

    // Append intl headers to authResponse headers
    intlHeaders.forEach((value, key) => {
      headers.append(key, value);
    });

    return new NextResponse(authResponse.body, {
      ...authResponse,
      headers,
    });
    
  }
 

  return NextResponse.next();
}
*/
export const config = {
  // Match only internationalized pathnames
  //matcher: ['/', localizedUrls] //cant be used "dynamic strings", really sucks
//  matcher: ['/', '/(es|en)/:path*']
  matcher: ['/((?!api|_next|_vercel|images|.*\\..*).*)']
};