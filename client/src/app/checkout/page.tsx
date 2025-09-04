export const dynamic = 'force-static';

export default function Checkout() {
  return (
    <main style={{maxWidth: 800, margin: '40px auto', padding: 24}}>
      <h1 style={{fontSize: 28, fontWeight: 700, marginBottom: 12}}>Checkout</h1>
      <p style={{opacity: 0.8}}>
        Payments are temporarily disabled while we finish setup.
        You can still browse the catalog, add items to cart, and test the rest of the site.
      </p>
    </main>
  );
}
