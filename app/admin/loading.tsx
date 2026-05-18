export default function AdminLoading() {
  return (
    <div className="px-6 py-8 sm:px-8 lg:px-10">
      <div className="h-8 w-48 animate-pulse bg-white/10" />
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-36 animate-pulse bg-white/10" />
        ))}
      </div>
    </div>
  );
}
