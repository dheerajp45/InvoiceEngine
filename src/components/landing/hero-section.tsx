import Link from "next/link";
import { HeroFeaturePills } from "./hero-feature-pills";
import { HeroIllustration } from "./hero-illustration";
import { ArrowDownIcon, ArrowRightIcon, SparkleIcon } from "./landing-icons";

export function HeroSection() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl flex-1 grid-cols-1 items-center gap-8 px-4 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-8 md:grid-cols-2 md:grid-rows-[auto_auto] md:items-center md:gap-x-10 md:gap-y-8 lg:gap-x-12 lg:pb-20 lg:pt-12">
        <div className="flex flex-col md:col-start-1 md:row-start-1">
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-1.5 text-xs text-gray-600 shadow-sm backdrop-blur-sm sm:mb-6 sm:px-4 sm:text-sm">
            <SparkleIcon className="size-3.5 text-[#0F766E]" />
            Modern invoicing for modern businesses
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl">
            Invoicing,{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, #0F766E 0%, #047857 55%, #065F46 100%)",
              }}
            >
              simplified.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 sm:mt-6 sm:text-lg">
            Create professional invoices, download polished PDFs, manage your
            invoices, and securely share them with public links—all from one
            modern workspace.
          </p>

          <div className="mt-6 sm:mt-8">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 sm:px-6 sm:py-3"
            >
              Get Started
              <ArrowRightIcon />
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center py-4 md:col-start-2 md:row-start-1 md:justify-center md:py-0">
          <HeroIllustration className="max-w-[360px] sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-[44rem]" />
        </div>

        <div className="md:col-start-1 md:row-start-2">
          <HeroFeaturePills />
        </div>
      </section>

      <div className="flex justify-center pb-6 sm:pb-8">
        <ArrowDownIcon className="size-5 text-gray-500" />
      </div>
    </>
  );
}