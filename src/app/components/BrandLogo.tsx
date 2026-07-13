import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  asLink?: boolean;
  href?: string;
};

export function BrandLogo({ className, asLink = false, href = "/" }: BrandLogoProps) {
  const mark = (
    <span
      className={cn(
        "text-lg font-bold tracking-tight text-gray-900",
        className
      )}
    >
      InvoiceEngine
    </span>
  );

  if (asLink) {
    return (
      <Link href={href} className="shrink-0">
        {mark}
      </Link>
    );
  }

  return mark;
}