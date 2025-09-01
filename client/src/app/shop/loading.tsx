export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl p-6">
      <div className="grid gap-6 md:gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl border p-3 animate-pulse">
            <div className="w-full rounded-md bg-white/10" style={{ aspectRatio: "4/3" }} />
            <div className="h-4 bg-white/10 mt-3 rounded" />
            <div className="h-3 bg-white/10 mt-2 rounded w-1/2" />
          </div>
        ))}
      </div>
    </main>
  );
}
