import BrandLogoLink from "../components/BrandLogoLink";
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
          <BrandLogoLink />
          <nav className="flex items-center gap-1 sm:gap-2">
            <Header />
          </nav>
        </div>
      </header>
      <main className="min-h-[calc(100vh-4rem)] bg-white">{children}</main>
    </>
  );
}
