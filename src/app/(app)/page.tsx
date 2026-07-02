import Link from "next/link";

export default function Page() {
  return (
    <div className="page-shell">
      <section className="py-12 text-center sm:py-20">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-gray-500">
          Invoice Engine
        </p>
        <h1 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Create professional invoices in minutes
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-gray-600">
          Sign in to create, save, and manage your invoices in one place.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/signin" className="btn-primary">
            Sign in
          </Link>
          <Link href="/signup" className="btn-secondary">
            Create account
          </Link>
          <Link href="/landing" className="btn-ghost">
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
            title: "Saved invoices",
            desc: "Every invoice is stored securely and tied to your account.",
          },
          {
            title: "Edit anytime",
            desc: "Update details, view, or delete invoices from your dashboard.",
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
