import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
//import { localesRegExPart } from './lib/constants';
export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  //matcher: ['/', `/(${localesRegExPart})/:path*`] cant be used "dynamic strings", really sucks
  matcher: ['/', '/(es|en)/:path*']
};