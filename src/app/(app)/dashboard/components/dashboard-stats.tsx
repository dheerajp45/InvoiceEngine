type DashboardStatsProps = {
  total: number;
  thisMonth: number;
  latestLabel: string | null;
};

function StatCard({
  label,
  value,
  accent,
  compact,
}: {
  label: string;
  value: string;
  accent: "emerald" | "slate";
  compact?: boolean;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p
        className={`mt-2 truncate font-bold tracking-tight ${
          compact ? "text-base sm:text-lg" : "text-2xl sm:text-3xl"
        } ${accent === "emerald" ? "text-[#0F766E]" : "text-gray-900"}`}
        title={value}
      >
        {value}
      </p>
    </div>
  );
}

export function DashboardStats({
  total,
  thisMonth,
  latestLabel,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
      <StatCard label="Total invoices" value={String(total)} accent="emerald" />
      <StatCard
        label="Created this month"
        value={String(thisMonth)}
        accent="emerald"
      />
      <StatCard
        label="Latest invoice"
        value={latestLabel ?? "—"}
        accent="slate"
        compact
      />
    </div>
  );
}