import Link from "next/link";
import { ArrowRightIcon } from "./landing-icons";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export function LandingNav() {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
      <Link href="/landing" className="shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.svg"
          alt="Invoice Engine"
          className="hidden h-9 w-auto sm:block"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-icon.svg"
          alt="Invoice Engine"
          className="h-9 w-9 sm:hidden"
        />
      </Link>

      <nav className="hidden items-center gap-8 md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-sm text-[#A3A3A3] transition-colors hover:text-[#F8FAFC]"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4 sm:gap-6">
        <Link
          href="/signin"
          className="text-sm text-[#A3A3A3] transition-colors hover:text-[#F8FAFC]"
        >
          Log in
        </Link>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-[#0A0A0A] transition-opacity hover:opacity-90 sm:px-5"
        >
          Get Started
          <ArrowRightIcon />
        </Link>
      </div>
    </header>
  );
}
