import { HeroSection } from "@/components/landing/hero-section";
import { LandingNav } from "@/components/landing/landing-nav";
import { MidnightMist } from "@/components/landing/midnight-mist";

export default function LandingPage() {
  return (
    <MidnightMist>
      <LandingNav />
      <HeroSection />
    </MidnightMist>
  );
}
