import type { MetadataRoute } from "next";
import { getSiteUrl } from "../../lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard",
        "/create",
        "/settings",
        "/invoice/",
        "/preview",
        "/api/",
        "/signin",
        "/signup",
        "/verify-email",
        "/password-reset",
        "/password-reset-request",
      ],
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}