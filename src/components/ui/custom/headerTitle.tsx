export default function HeaderTitle(props: {title: string}) {
  return (
    <div className="border-b bg-muted/40">
      <div className="container items-center py-3">
        <h1 className="text-2xl font-semibold">{props.title}</h1>
      </div>
    </div>
  );
}