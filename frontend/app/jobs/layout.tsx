export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="bg-card py-16 text-center border-b">
        <h1 className="text-5xl font-bold">Jobs</h1>
      </div>

      {children}
    </section>
  );
}
