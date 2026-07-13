"use client";

import { authClient } from "../../../lib/auth-client";
import { BrandLogo } from "./BrandLogo";

export default function BrandLogoLink() {
  const { data: session } = authClient.useSession();
  const href = session?.user ? "/dashboard" : "/";

  return <BrandLogo asLink href={href} />;
}