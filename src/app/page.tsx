import type { Metadata } from "next";
import { HeroSection } from "@/components/landing/hero-section";
import { LandingNav } from "@/components/landing/landing-nav";
import { MidnightMist } from "@/components/landing/midnight-mist";

export const metadata: Metadata = {
  title: "Invoice Engine — Invoicing, simplified.",
  description:
    "Create professional invoices in minutes, manage them effortlessly, and get paid faster. Built for freelancers and businesses of all sizes.",
};

export default function HomePage() {
  return (
    <MidnightMist>
      <LandingNav />
      <HeroSection />
    </MidnightMist>
  );
}