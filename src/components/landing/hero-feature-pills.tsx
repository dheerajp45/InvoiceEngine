import {
  DocumentIcon,
  DownloadIcon,
  LinkIcon,
  LockIcon,
} from "./landing-icons";

const features = [
  { label: "Create Invoices", icon: DocumentIcon },
  { label: "Secure & Private", icon: LockIcon },
  { label: "PDF Export", icon: DownloadIcon },
  { label: "Share Anywhere", icon: LinkIcon },
];

export function HeroFeaturePills() {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {features.map(({ label, icon: Icon }) => (
        <div
          key={label}
          className="group flex items-center gap-2.5 rounded-2xl border border-white/70 bg-white/85 px-3.5 py-2.5 shadow-sm backdrop-blur-md transition hover:border-emerald-900/10 hover:shadow-md"
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#0F766E] ring-1 ring-emerald-100/80 transition group-hover:bg-emerald-100/80">
            <Icon className="size-3.5" />
          </span>
          <span className="text-sm font-medium tracking-tight text-gray-900">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}