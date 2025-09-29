export default function PageHeader({ title }: { title: string }) {
  return (
    <div className="mt-4 mb-4">
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}
