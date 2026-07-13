import { InvoiceProvider } from "./context/invoice-context";
import "./globals.css";
import { Figtree } from "next/font/google";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import {
  buildOpenGraph,
  buildTwitterCard,
  defaultIcons,
  getSiteUrl,
  siteConfig,
} from "../../lib/seo";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  icons: defaultIcons,
  manifest: "/manifest.webmanifest",
  openGraph: buildOpenGraph(),
  twitter: buildTwitterCard(),
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
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