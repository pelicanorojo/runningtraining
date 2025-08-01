/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2025-02-05T02:00:15-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-07-31T08:46:34-03:00
 */

import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;
 
  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as 'en'|'es')) {
    locale = routing.defaultLocale;
  }
 
  return {
    locale,
    messages: (await import(`@/i18n/messages/${locale}.json`)).default
  };
});
