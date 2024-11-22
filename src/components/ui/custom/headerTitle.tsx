/*
 * @Author: Pablo Benito <pelicanorojo> bioingbenito@gmail.com
 * @Date: 2024-11-21T11:34:30-03:00
 * @Last modified by: Pablo Benito <pelicanorojo>
 * @Last modified time: 2024-11-21T11:36:55-03:00
 */


export default function HeaderTitle(props: {title: string}) {
  return (
    <div className="border-b bg-muted/40">
      <div className="container items-center py-3">
        <h1 className="text-2xl font-semibold">{props.title}</h1>
      </div>
    </div>
  );
}