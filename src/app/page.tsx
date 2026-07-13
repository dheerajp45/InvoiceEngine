import type { Metadata } from "next";
import { HeroSection } from "@/components/landing/hero-section";
import { LandingNav } from "@/components/landing/landing-nav";
import { MidnightMist } from "@/components/landing/midnight-mist";
import {
  buildCanonical,
  buildOpenGraph,
  buildTwitterCard,
  getHomeJsonLd,
  siteConfig,
} from "../../lib/seo";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  alternates: {
    canonical: buildCanonical("/"),
  },
  openGraph: buildOpenGraph({
    title: siteConfig.title,
    path: "/",
  }),
  twitter: buildTwitterCard({
    title: siteConfig.title,
    path: "/",
  }),
};

export default function HomePage() {
  return (
    <MidnightMist>
      <LandingNav />
      <main>
        <HeroSection />
      </main>
      <footer className="mx-auto w-full max-w-7xl px-6 pb-8 pt-4 text-center text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}. Free online
          invoice generator for freelancers and businesses.
        </p>
        <p className="mt-2">
          Built by Dheeraj        </p>
      </footer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getHomeJsonLd()) }}
      />
    </MidnightMist>
  );
}