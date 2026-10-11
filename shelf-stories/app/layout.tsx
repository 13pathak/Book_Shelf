import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shelf & Story — Your library, brought to life",
  description: "Explore your school library, find your next story, and see what's available on the shelf.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
