import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoice Engine — Invoicing, simplified.",
  description:
    "Create professional invoices in minutes, manage them effortlessly, and get paid faster. Built for freelancers and businesses of all sizes.",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-black">{children}</div>;
}
