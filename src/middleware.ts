import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
//import { localesRegExPart } from './lib/constants';
//const localizedUrls = `/(${localesRegExPart})/:path*`;
export default createMiddleware(routing);
export const config = {
  // Match only internationalized pathnames
  //matcher: ['/', localizedUrls] //cant be used "dynamic strings", really sucks
//  matcher: ['/', '/(es|en)/:path*']
  matcher: ['/((?!api|_next|_vercel|images|.*\\..*).*)']
};