import Link from "next/link";
import Header from "../components/Header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-gray-900"
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
            <Header />
          </nav>
        </div>
      </header>
      <main className="min-h-[calc(100vh-4rem)] bg-white">{children}</main>
    </>
  );
}
