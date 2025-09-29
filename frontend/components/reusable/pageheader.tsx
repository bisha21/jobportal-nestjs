export default function PageHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4 mb-4 ">
      <h1 className="text-4xl font-bold mb-4 text-center">{children}</h1>
    </div>
  );
}
