/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-12-14T12:09:08-03:00
 */


//import AuthBox from '@/components/ui/custom/authBox';

export default function Header(props: {title: string}) {
  return (
    <header role="header" className="border-b">
      <div className="border-b bg-muted/40">
        <div className="flex justify-between  items-center py-3">
          <h1 className="text-2xl font-semibold">{props.title}</h1>
          {/*<AuthBox />*/}
        </div>
      </div>
    </header>
  );
}
