import type { Metadata } from "next";
import "./globals.css";

// If you have these components, they will render.
// If not, you can remove them safely.
import ClientRoot from "./components/ClientRoot";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Mavericks — Built by Cloud Sailors Lab",
  description: "Premium goods, verified sellers, global delivery.",
  // ✅ This becomes <link rel="canonical" .../> in <head>
  alternates: {
    canonical: "https://mavericks-monorepo-starter-1.onrender.com/",
  },
  // ✅ This becomes <meta name="robots" .../> in <head>
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientRoot>
          {/* Remove Header/Footer if you don’t have these components */}
          <Header />
          {children}
          <Footer />
        </ClientRoot>
      </body>
    </html>
  );
}
