import { InvoiceProvider } from "./context/invoice-context";
import "./globals.css";
import { Figtree } from "next/font/google";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  icons: { icon: "/favicon.png" },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", figtree.variable)}>
      <body className="antialiased">
        <InvoiceProvider>{children}</InvoiceProvider>
        <Analytics />
      </body>
    </html>
  );
}