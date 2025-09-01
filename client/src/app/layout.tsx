// client/src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Assistant from "./components/Assistant"; // floating AI widget

export const metadata: Metadata = {
  title: "Mavericks — Built by Cloud Sailors Lab",
  description:
    "Premium goods, verified sellers, global delivery. Built to feel like a billion-dollar experience.",
  icons: { icon: "/favicon.ico" },
  applicationName: "Mavericks",
  keywords: ["Mavericks", "Marketplace", "Ecommerce", "Cloud Sailors Lab"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="
          min-h-screen bg-gradient-to-b from-[#0b1020] to-[#05070f]
          text-neutral-100 antialiased
        "
      >
        {/* Your app pages */}
        {children}

        {/* One-time global widgets */}
        <Assistant />
      </body>
    </html>
  );
}
