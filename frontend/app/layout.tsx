"use client";

import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Don't show logo on landing page or poc page (they have their own headers)
  const showLogo = pathname !== "/" && pathname !== "/poc";

  return (
    <html lang="en" className="font-menlo">
      <body className="antialiased">
        {showLogo && (
          <header className="block w-full bg-[#161924] pt-6 pb-4 pl-10">
            <Link href="/poc">
              <Image
                src="/logo_text.svg"
                alt="Orbit"
                width={80}
                height={27}
                className="opacity-90 cursor-pointer"
              />
            </Link>
          </header>
        )}
        {children}
      </body>
    </html>
  );
}
