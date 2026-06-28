import Link from "next/link";
import { Button } from "@/components/ui/button"
export default function landingPage() {
  return (
    <div className="page-shell">
      <div className="card mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium text-brand">Welcome to</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Invoice Engine
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-gray-600">
          A simple tool to create, preview, and download invoices. Built as a
          learning project for Next.js, TypeScript, and modern web development.
        </p>

        <ul className="mt-8 space-y-3 text-left text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-brand">✓</span>
            Create invoices with multiple line items
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-brand">✓</span>
            Automatic tax and discount calculations
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-brand">✓</span>
            Preview before download (PDF coming next)
          </li>
        </ul>

        <Link href="/create" className="btn-primary mt-8">
          Create your invoice for free
        </Link>
        <Button>   <Link href="/create">
          Create your invoice for free
        </Link></Button>
      </div>
    </div>
  );
}
