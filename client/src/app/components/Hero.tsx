"use client";

import Link from "next/link";
import SafeImage from "./SafeImage";

export default function Hero() {
  return (
    <section
      className="
        relative min-h-[72vh] w-full overflow-hidden
        flex items-center justify-center
      "
      aria-label="Welcome to Mavericks"
    >
      {/* BACKGROUND IMAGE (behind content, can't capture clicks) */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <SafeImage
          src="https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=3840&auto=format&fit=crop"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* SOFT OVERLAY for contrast (lighter than before) */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-[#0b1420]/35" />

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
            The Mavericks Marketplace.
          </h1>

          <p className="mt-4 text-white/85 max-w-2xl mx-auto text-base sm:text-lg">
            Premium goods, verified sellers, global delivery. Built to feel like a{" "}
            <span className="italic">billion-dollar</span> experience.
          </p>

          {/* ACTIONS */}
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/shop"
              className="
                inline-flex items-center justify-center rounded-xl
                bg-[#1e90ff] hover:bg-[#1a7ae0]
                text-white font-semibold
                px-6 py-3 shadow-lg shadow-[#1e90ff]/25
                transition-transform duration-150 hover:-translate-y-0.5
                focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                focus-visible:ring-[#1e90ff] focus-visible:ring-offset-[#0b1420]
              "
            >
              Shop Now
            </Link>

            <Link
              href="/about"
              className="
                inline-flex items-center justify-center rounded-xl
                border border-white/20 bg-white/5 hover:bg-white/10
                text-white font-semibold
                px-6 py-3 backdrop-blur-sm
                transition-transform duration-150 hover:-translate-y-0.5
                focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                focus-visible:ring-white/50 focus-visible:ring-offset-[#0b1420]
              "
            >
              Our Mission
            </Link>
          </div>

          {/* QUICK STATS */}
          <div
            className="
              mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4
              max-w-3xl mx-auto
            "
          >
            <div className="rounded-2xl bg-white/7.5 border border-white/15 px-5 py-4 backdrop-blur-md">
              <div className="text-2xl font-bold">4K</div>
              <div className="text-sm text-white/75">imagery across the site</div>
            </div>
            <div className="rounded-2xl bg-white/7.5 border border-white/15 px-5 py-4 backdrop-blur-md">
              <div className="text-2xl font-bold">150+</div>
              <div className="text-sm text-white/75">countries</div>
            </div>
            <div className="rounded-2xl bg-white/7.5 border border-white/15 px-5 py-4 backdrop-blur-md">
              <div className="text-2xl font-bold">99.99%</div>
              <div className="text-sm text-white/75">uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM FADE so next section pops */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0b1420] to-transparent" />
    </section>
  );
}
