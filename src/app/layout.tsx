import Link from "next/link";
import { InvoiceProvider } from "./context/invoice-context";
import "./globals.css";
import Header from "./components/Header";
import { Figtree } from "next/font/google";
import { cn } from "@/lib/utils";

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) 
{
  return (
    <html lang="en" className={cn("font-sans", figtree.variable)}>
      <body className="antialiased">
        <InvoiceProvider>
        
          <header className="border-b border-gray-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
              <Link
                href="/"
                className="text-lg font-bold tracking-tight text-brand"
              >
                InvoiceEngine
              </Link>
              <nav className="flex items-center gap-1 sm:gap-2">
                <Link href="/landing" className="btn-ghost">
                  About
                </Link>
                <Link href="/create" className="btn-ghost">
                  Create
                </Link>
                <Link href="/preview" className="btn-primary">
                  Preview
                </Link>
                <Header />
              </nav>
            </div>
          
          </header>
        
          <main>{children}</main>
        </InvoiceProvider>
      </body>
    </html>
  );
}
