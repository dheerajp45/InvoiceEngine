import Link from "next/link";
import { HeroFeaturePills } from "./hero-feature-pills";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  PlayCircleIcon,
  SparkleIcon,
} from "./landing-icons";

function HeroIllustration() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/hero-illustration.png"
      alt="Invoice workflow illustration"
      width={1402}
      height={1122}
      className="mx-auto w-full max-w-[280px] object-contain mix-blend-screen sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl"
      loading="eager"
      decoding="async"
    />
  );
}

export function HeroSection() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl flex-1 grid-cols-1 items-center gap-8 px-4 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-8 md:grid-cols-2 md:grid-rows-[auto_auto] md:gap-x-10 md:gap-y-8 lg:gap-x-12 lg:pb-20 lg:pt-12">
        <div className="flex flex-col md:col-start-1 md:row-start-1">
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#262626] bg-[#141414]/80 px-3 py-1.5 text-xs text-[#A3A3A3] sm:mb-6 sm:px-4 sm:text-sm">
            <SparkleIcon />
            Modern invoicing for modern businesses
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-[#F8FAFC] sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl">
            Invoicing,{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, #E0E7FF 0%, #818CF8 50%, #6366F1 100%)",
              }}
            >
              simplified.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#A3A3A3] sm:mt-6 sm:text-lg">
            Create professional invoices in minutes, manage them effortlessly,
            and get paid faster. Built for freelancers and businesses of all
            sizes.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#0A0A0A] transition-opacity hover:opacity-90 sm:px-6 sm:py-3"
            >
              Get Started
              <ArrowRightIcon />
            </Link>
            <Link
              href="/preview"
              className="inline-flex items-center gap-2 rounded-full border border-[#404040] bg-transparent px-5 py-2.5 text-sm font-medium text-[#F8FAFC] transition-colors hover:border-[#525252] sm:px-6 sm:py-3"
            >
              <PlayCircleIcon />
              View Demo
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center py-2 md:col-start-2 md:row-span-2 md:row-start-1 md:py-0 md:self-center">
          <HeroIllustration />
        </div>

        <div className="md:col-start-1 md:row-start-2">
          <HeroFeaturePills />
        </div>
      </section>

      <div className="flex justify-center pb-6 sm:pb-8">
        <ArrowDownIcon className="size-5 text-[#737373]" />
      </div>
    </>
  );
}
