import type { Metadata } from "next";

export const siteConfig = {
  name: "Invoice Engine",
  title: "Invoice Engine – Free & Simple Online Invoice Generator",
  description:
    "Create, manage, download and share professional invoices with Invoice Engine. Free online invoice creator with PDF export and secure share links.",
  ogDescription:
    "Create, manage, and share professional invoices. Free online invoice generator with PDF export.",
  tagline: "Invoicing, simplified.",
  themeColor: "#0F766E",
  icon: "/tab-icon.png",
  ogImage: "/og-image.png",
  keywords: [
    "invoice generator",
    "free invoice generator",
    "online invoice creator",
    "professional invoice software",
    "PDF invoice",
    "business invoice",
    "invoice management",
  ],
} as const;

export function getSiteUrl() {
  const url =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.APP_URL ??
    "http://localhost:3000";
  return url.replace(/\/$/, "");
}

export const defaultIcons: NonNullable<Metadata["icons"]> = {
  icon: [{ url: "/tab-icon.png", type: "image/png" }],
  apple: [{ url: "/tab-icon.png", type: "image/png" }],
  shortcut: ["/tab-icon.png"],
};

export function truncateOgDescription(text: string, max = 100) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 3).trimEnd()}...`;
}

export function buildCanonical(path = "/") {
  const base = getSiteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized === "/" ? "" : normalized}`;
}

type OpenGraphOptions = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

export function buildOpenGraph({
  title = siteConfig.title,
  description = siteConfig.ogDescription,
  path = "/",
  image = siteConfig.ogImage,
}: OpenGraphOptions = {}): Metadata["openGraph"] {
  const url = buildCanonical(path);
  const imageUrl = image.startsWith("http") ? image : buildCanonical(image);
  const ogDescription = truncateOgDescription(description);

  return {
    type: "website",
    locale: "en_US",
    url,
    siteName: siteConfig.name,
    title,
    description: ogDescription,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} – Free online invoice generator`,
      },
    ],
  };
}

export function buildTwitterCard(
  options: OpenGraphOptions = {}
): Metadata["twitter"] {
  const image = options.image ?? siteConfig.ogImage;

  const description = truncateOgDescription(
    options.description ?? siteConfig.ogDescription
  );

  return {
    card: "summary_large_image",
    title: options.title ?? siteConfig.title,
    description,
    images: [
      image.startsWith("http") ? image : buildCanonical(image),
    ],
  };
}

export function privatePageMetadata(title: string): Metadata {
  return {
    title,
    robots: { index: false, follow: false },
  };
}

export function getHomeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    url: getSiteUrl(),
    description: siteConfig.description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}