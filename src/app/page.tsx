import Link from "next/link";

export default function Page() {
  return (
    <div className="page-shell">
      <section className="py-12 text-center sm:py-20">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-brand">
          Free invoice generator
        </p>
        <h1 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Create professional invoices in minutes
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-gray-600">
          No account required. Fill in your details, preview your invoice, and
          download it as a PDF.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/create" className="btn-primary">
            Create invoice
          </Link>
          <Link href="/landing" className="btn-secondary">
            Learn more
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "Fast setup",
            desc: "Add customer info, line items, tax, and discounts in one form.",
          },
          {
            title: "Live preview",
            desc: "See exactly how your invoice looks before you download it.",
          },
          {
            title: "Guest friendly",
            desc: "Start invoicing immediately — no sign up needed for V1.",
          },
        ].map((feature) => (
          <div key={feature.title} className="card">
            <h2 className="font-semibold text-gray-900">{feature.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
