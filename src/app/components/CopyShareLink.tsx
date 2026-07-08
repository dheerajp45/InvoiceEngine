"use client";

import { useState } from "react";

type CopyShareLinkProps = {
  publicId: string;
  appUrl?: string;
};

export default function CopyShareLink({ publicId, appUrl }: CopyShareLinkProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const baseUrl = appUrl || window.location.origin;
    const shareUrl = `${baseUrl}/share/${publicId}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button type="button" onClick={handleCopy} className="btn-secondary">
      {copied ? "Copied!" : "Copy share link"}
    </button>
  );
}
