/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2025-02-20T09:57:25-03:00
 */

//import LanguageSwitcher from '@/components/ui/custom/languageSwitcher';

import AuthBox from '@/components/ui/custom/authBox';

export default function Header(props: {title: string}) {
  return (
    <header role="header" className="border-b h-[4rem]">
      <div className="bg-muted/40">
        <div className="flex justify-between items-center py-3">
          <h1 className="text-1xl font-semibold">{props.title}</h1>
          {/*<LanguageSwitcher/>*/}
          <AuthBox/>
        </div>
      </div>
    </header>
  );
}
