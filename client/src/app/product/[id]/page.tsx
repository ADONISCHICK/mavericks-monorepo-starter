// server component
import Link from "next/link";
import SafeImage from "../../components/SafeImage"; // relative to /product/[id]/page.tsx

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type Specs = Record<string, any>;

type Product = {
  id: string;
  title: string;
  price: number;
  currency?: string;
  images?: string[];
  category?: string;
  description?: string;
  specs?: Specs;
};

async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`${API}/products/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const item = await getProduct(params.id);
  if (!item) {
    return (
      <main className="min-h-screen px-5 md:px-10 py-10">
        <Link href="/shop" className="text-sm opacity-70">← Back to Shop</Link>
        <h1 className="mt-6 text-2xl font-bold">Product not found</h1>
      </main>
    );
  }

  const gallery = item.images && item.images.length > 0 ? item.images : [
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1600&auto=format&fit=crop",
  ];

  return (
    <main className="min-h-screen px-5 md:px-10 py-10">
      <div className="mb-6">
        <Link href="/shop" className="text-sm opacity-70">← Back to Shop</Link>
      </div>

      <section className="grid gap-10 md:grid-cols-2">
        {/* Gallery */}
        <div className="grid gap-4">
          <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
            <SafeImage
              src={gallery[0]}
              alt={item.title}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {gallery.slice(1, 5).length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {gallery.slice(1, 5).map((src, i) => (
                <div key={i} className="relative rounded-lg overflow-hidden" style={{ aspectRatio: "1/1" }}>
                  <SafeImage src={src} alt={`${item.title} ${i + 2}`} fill sizes="25vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold">{item.title}</h1>
          <div className="mt-1 text-sm opacity-70">{item.category || "General"}</div>
          <div className="mt-4 text-2xl">
            {item.currency || "USD"} {item.price.toFixed(2)}
          </div>

          <div className="mt-6 space-y-2">
            <button className="w-full md:w-auto rounded-lg border px-5 py-2 hover:bg-white/5">
              Add to Cart
            </button>
            <button className="w-full md:w-auto rounded-lg border px-5 py-2 hover:bg-white/5 md:ml-3">
              Buy Now
            </button>
          </div>

          {item.description && (
            <div className="mt-8">
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="opacity-80 leading-relaxed">{item.description}</p>
            </div>
          )}

          {item.specs && Object.keys(item.specs).length > 0 && (
            <div className="mt-8">
              <h2 className="font-semibold mb-2">Specifications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                {Object.entries(item.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6">
                    <span className="opacity-70">{k}</span>
                    <span className="text-right break-words">{typeof v === "object" ? JSON.stringify(v) : String(v)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
