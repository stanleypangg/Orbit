import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orbit",
  description: "Orbit - AI-powered workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-menlo">
      <body className="antialiased">{children}</body>
    </html>
  );
}
