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
    <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3">
      {features.map(({ label, icon: Icon }) => (
        <div
          key={label}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#262626] bg-[#141414]/80 px-3 py-2 text-xs text-[#F8FAFC] sm:justify-start sm:gap-2 sm:px-4 sm:text-sm"
        >
          <Icon className="size-3 sm:size-3.5" />
          <span className="truncate">{label}</span>
        </div>
      ))}
    </div>
  );
}
