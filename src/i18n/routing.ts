import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
import { supportedLocales, defaultLocale } from '@/lib/constants';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: supportedLocales,
 
  // Used when no locale matches
  defaultLocale: defaultLocale,
  localeDetection: true,
  localePrefix: 'always' // as needed / always (the default)
});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} = createNavigation(routing);
