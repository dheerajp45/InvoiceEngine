export function MidnightMist({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full bg-white">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 50% 100%, #f4f4f5 0%, #ffffff 48%, #fafafa 100%)
          `,
        }}
      />
      <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
    </div>
  );
}