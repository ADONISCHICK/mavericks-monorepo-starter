// client/src/app/page.tsx
import Link from "next/link";
import Image from "next/image";
import Hero from "./components/Hero";

type Product = {
  id: string;
  title: string;
  price: number;
  currency?: string;
  images?: string[];
  category?: string;
};

function apiBase() {
  // Prefer env, fall back to localhost:4000
  const fromEnv = process.env.NEXT_PUBLIC_API_URL;
  return (fromEnv && fromEnv.trim()) || "http://localhost:4000";
}

async function getFeatured(): Promise<Product[]> {
  const base = apiBase();
  try {
    const res = await fetch(`${base}/products?limit=8&sort=newest`, {
      // make sure SSR always tries to show something new
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    // Our server returns either an array or { items: Product[] }
    const items: Product[] = Array.isArray(data) ? data : data.items || [];
    return items.slice(0, 8);
  } catch {
    return [];
  }
}

export default async function Home() {
  const featured = await getFeatured();

  const categories = [
    {
      key: "Electronics",
      img:
        "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop",
    },
    {
      key: "Automotive",
      img:
        "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1600&auto=format&fit=crop",
    },
    {
      key: "Computers",
      img:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1600&auto=format&fit=crop",
    },
    {
      key: "Phones",
      img:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1600&auto=format&fit=crop",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* HERO */}
      <Hero />

      {/* CATEGORY SHORTCUTS */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-semibold">Browse Categories</h2>
          <Link
            href="/shop"
            className="text-[#1e90ff] hover:underline font-medium"
          >
            View all
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.key}
              href={`/shop?category=${encodeURIComponent(c.key)}`}
              className="
                group relative rounded-2xl overflow-hidden
                border border-white/10 bg-white/5 backdrop-blur
                hover:-translate-y-0.5 transition-transform
              "
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={c.img}
                  alt={c.key}
                  fill
                  sizes="(max-width:768px) 50vw, 25vw"
                  className="object-cover"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="inline-flex items-center gap-2 rounded-lg bg-black/50 px-3 py-1 text-white">
                  <span className="font-medium">{c.key}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-14">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-semibold">Featured</h2>
          <Link
            href="/shop?sort=newest"
            className="text-[#1e90ff] hover:underline font-medium"
          >
            See what’s new
          </Link>
        </div>

        {featured.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p>No products yet. Add some data to the API to see items here.</p>
          </div>
        ) : (
          <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.id}`}
                className="
                  group rounded-2xl overflow-hidden
                  border border-white/10 bg-white/5 backdrop-blur
                  hover:-translate-y-0.5 transition-transform
                "
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={
                      (p.images && p.images[0]) ||
                      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop"
                    }
                    alt={p.title}
                    fill
                    sizes="(max-width:768px) 50vw, 25vw"
                    className="object-cover"
                    priority={false}
                  />
                </div>
                <div className="p-3">
                  <div className="line-clamp-1 font-medium">{p.title}</div>
                  <div className="mt-1 text-white/80 text-sm">
                    {p.currency || "USD"} {p.price?.toLocaleString?.() ?? p.price}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
