// client/src/app/shop/page.tsx
import Link from "next/link";
import Image from "next/image";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type Product = {
  id: string;
  title: string;
  price: number;
  currency?: string;
  images?: string[];
};

async function getPage(searchParams: Record<string, string | string[] | undefined>) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(searchParams)) {
    if (Array.isArray(v)) sp.set(k, v[0] ?? "");
    else if (v != null) sp.set(k, String(v));
  }
  const url = `${API}/products?${sp.toString()}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    const items = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
    const page = Number(data?.page || 1);
    const total = Number(data?.total || items.length);
    const limit = Number(data?.limit || 24);
    return { items: items as Product[], page, total, limit };
  } catch {
    return { items: [] as Product[], page: 1, total: 0, limit: 24 };
  }
}

export default async function Shop({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { items } = await getPage(searchParams);

  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Shop</h1>
      {items.length === 0 ? (
        <p className="opacity-70">No results.</p>
      ) : (
        <ul className="grid gap-6 md:gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <li key={p.id} className="group rounded-xl border overflow-hidden hover:shadow-lg transition">
              <Link href={`/product/${p.id}`} className="block">
                <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src={p.images?.[0] || "https://picsum.photos/seed/m/1200/800"}
                    alt={p.title}
                    fill
                    sizes="(max-width:768px) 50vw, 25vw"
                    className="object-cover"
                    priority={false}
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium truncate">{p.title}</h3>
                  <p className="text-sm opacity-80">
                    {p.currency || "USD"} {Number(p.price).toFixed(2)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
