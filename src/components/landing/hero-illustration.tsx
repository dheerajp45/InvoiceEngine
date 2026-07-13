import type { ReactNode } from "react";

type HeroIllustrationProps = {
  className?: string;
};

const E = {
  deep: "#047857",
  mid: "#0F766E",
  muted: "#D1FAE5",
  mutedBorder: "#A7F3D0",
  ink: "#0F172A",
  slate: "#64748B",
  line: "#F1F5F9",
};

const VB_W = 600;
const VB_H = 440;

/** Main invoice — centered in canvas */
const IX = 145;
const IY = 72;
const IW = 310;
const IH = 296;
const PAD = 22;
const INNER_W = IW - PAD * 2;
const RIGHT_X = PAD + INNER_W;

const FLOAT_H = 40;
const ICON_PAD = 10;
const ICON_BOX = 28;
const ICON_GAP = 10;
const TEXT_X = ICON_PAD + ICON_BOX + ICON_GAP;
const TEXT_Y = FLOAT_H / 2;

function FloatMotion({ dur = "5s", delay = "0s" }: { dur?: string; delay?: string }) {
  return (
    <animateTransform
      attributeName="transform"
      type="translate"
      values="0,0; 0,-4; 0,0"
      dur={dur}
      begin={delay}
      repeatCount="indefinite"
      additive="sum"
    />
  );
}

function FeatureFloat({
  x,
  y,
  rotate,
  label,
  width,
  icon,
  motionDur,
  motionDelay,
}: {
  x: number;
  y: number;
  rotate: number;
  label: string;
  width: number;
  icon: ReactNode;
  motionDur?: string;
  motionDelay?: string;
}) {
  const iconCy = FLOAT_H / 2;

  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      {motionDur && <FloatMotion dur={motionDur} delay={motionDelay} />}
      <rect
        x={0}
        y={0}
        width={width}
        height={FLOAT_H}
        rx={11}
        fill="#FFFFFF"
        fillOpacity={0.97}
        stroke="#E5E7EB"
        strokeWidth="1"
        filter="url(#floatSm)"
      />
      <rect
        x={ICON_PAD}
        y={iconCy - ICON_BOX / 2}
        width={ICON_BOX}
        height={ICON_BOX}
        rx={8}
        fill="#F0FDF4"
        stroke="#BBF7D0"
        strokeWidth="1"
      />
      <g transform={`translate(${ICON_PAD + ICON_BOX / 2} ${iconCy})`}>{icon}</g>
      <text
        x={TEXT_X}
        y={TEXT_Y}
        dominantBaseline="middle"
        fill={E.ink}
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="10.5"
        fontWeight="600"
        letterSpacing="-0.01em"
      >
        {label}
      </text>
    </g>
  );
}

export function HeroIllustration({ className }: HeroIllustrationProps) {
  const invoiceCx = IX + IW / 2;
  const invoiceCy = IY + IH / 2;

  return (
    <div className={`relative mx-auto w-full ${className ?? ""}`}>
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[70%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(4, 120, 87, 0.055) 0%, rgba(4, 120, 87, 0.015) 50%, transparent 75%)",
        }}
        aria-hidden
      />

      <svg
        className="relative z-10 mx-auto block w-full"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Invoice Engine product preview showing invoice creation, PDF export, and sharing"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="floatLg" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#0f172a" floodOpacity="0.09" />
          </filter>
          <filter id="floatSm" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0f172a" floodOpacity="0.06" />
          </filter>
          <linearGradient id="ambientLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#F8FAFC" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="accentBar" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#065F46" />
            <stop offset="50%" stopColor="#0F766E" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>

        {/* depth plate */}
        <g transform={`rotate(-1.5 ${invoiceCx} ${invoiceCy})`}>
          <rect
            x={IX - 8}
            y={IY - 6}
            width={IW + 16}
            height={IH + 12}
            rx={20}
            fill="#F8FAFC"
            stroke="#E2E8F0"
            strokeWidth="1"
            opacity="0.55"
            filter="url(#floatLg)"
          />
        </g>

        {/* ── floating cards — outside invoice, never overlapping ── */}
        <FeatureFloat
          x={448}
          y={38}
          rotate={2}
          width={136}
          label="Send Invoice"
          motionDur="6s"
          motionDelay="0.5s"
          icon={
            <>
              <rect x={-6.5} y={-5.5} width={13} height={10} rx={1.5} stroke={E.deep} strokeWidth="1.5" fill="none" />
              <path d="M-5.5 -3.5L0 0l5.5-3.5" stroke={E.deep} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </>
          }
        />
        <FeatureFloat
          x={458}
          y={212}
          rotate={2.2}
          width={122}
          label="Share Link"
          motionDur="5.8s"
          motionDelay="0.9s"
          icon={
            <>
              <path d="M-5.5 1.5h6.5" stroke={E.deep} strokeWidth="1.5" strokeLinecap="round" />
              <path d="M2.5 -3.5l4 4-4 4" stroke={E.deep} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </>
          }
        />
        <FeatureFloat
          x={16}
          y={382}
          rotate={-1.5}
          width={132}
          label="Download PDF"
          motionDur="6.2s"
          motionDelay="1.3s"
          icon={
            <>
              <path d="M0 -5.5v6.5" stroke={E.deep} strokeWidth="1.5" strokeLinecap="round" />
              <path d="M-3.5 0.5L0 4l3.5-3.5" stroke={E.deep} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M-5.5 6.5h11" stroke={E.deep} strokeWidth="1.5" strokeLinecap="round" />
            </>
          }
        />

        {/* ── main invoice ── */}
        <g transform={`translate(${IX} ${IY})`}>
          <rect
            x={0}
            y={0}
            width={IW}
            height={IH}
            rx={18}
            fill="#FFFFFF"
            stroke="#E2E8F0"
            strokeWidth="1.5"
            filter="url(#floatLg)"
          />

          <rect x={0} y={0} width={IW} height={3} rx={1.5} fill="url(#accentBar)" />
          <rect x={1} y={3} width={IW - 2} height={52} rx={16} fill="url(#ambientLight)" />
          <path d={`M0 54h${IW}`} stroke={E.line} strokeWidth="1" />

          <circle cx={20} cy={28} r={4} fill="#E2E8F0" />
          <circle cx={34} cy={28} r={4} fill="#E2E8F0" />
          <circle cx={48} cy={28} r={4} fill="#E2E8F0" />
          <text
            x={IW / 2}
            y={31}
            textAnchor="middle"
            fill={E.ink}
            fontFamily="Inter, system-ui, sans-serif"
            fontSize="10.5"
            fontWeight="600"
          >
            Invoice Engine
          </text>

          {/* title row */}
          <text x={PAD} y={78} fill={E.ink} fontFamily="Inter, system-ui, sans-serif" fontSize="15" fontWeight="700">
            Invoice
          </text>


          {/* invoice no + date */}
          <text x={PAD} y={104} fill={E.slate} fontFamily="Inter, system-ui, sans-serif" fontSize="9" fontWeight="600" letterSpacing="0.07em">
            INVOICE NO.
          </text>
          <text x={PAD} y={120} fill={E.ink} fontFamily="Inter, system-ui, sans-serif" fontSize="13" fontWeight="600">
            INV-2026-0042
          </text>

          <text x={RIGHT_X} y={104} textAnchor="end" fill={E.slate} fontFamily="Inter, system-ui, sans-serif" fontSize="9" fontWeight="600" letterSpacing="0.07em">
            DATE
          </text>
          <text x={RIGHT_X} y={120} textAnchor="end" fill={E.ink} fontFamily="Inter, system-ui, sans-serif" fontSize="12" fontWeight="500">
            12 Mar 2026
          </text>

          <path d={`M${PAD} 132h${INNER_W}`} stroke={E.line} strokeWidth="1" />

          {/* customer */}
          <text x={PAD} y={150} fill={E.slate} fontFamily="Inter, system-ui, sans-serif" fontSize="9" fontWeight="600" letterSpacing="0.07em">
            CUSTOMER
          </text>
          <text x={PAD} y={168} fill={E.ink} fontFamily="Inter, system-ui, sans-serif" fontSize="13" fontWeight="600">
            Acme Studio
          </text>
          <text x={PAD} y={184} fill={E.slate} fontFamily="Inter, system-ui, sans-serif" fontSize="11">
            billing@acmestudio.in
          </text>

          <path d={`M${PAD} 196h${INNER_W}`} stroke={E.line} strokeWidth="1" />

          {/* line items */}
          <text x={PAD} y={214} fill="#94A3B8" fontFamily="Inter, system-ui, sans-serif" fontSize="9" fontWeight="500">
            Item
          </text>
          <text x={RIGHT_X} y={214} textAnchor="end" fill="#94A3B8" fontFamily="Inter, system-ui, sans-serif" fontSize="9" fontWeight="500">
            Amount
          </text>

          <text x={PAD} y={234} fill="#334155" fontFamily="Inter, system-ui, sans-serif" fontSize="11.5" fontWeight="500">
            Brand identity design
          </text>
          <text x={RIGHT_X} y={234} textAnchor="end" fill={E.ink} fontFamily="Inter, system-ui, sans-serif" fontSize="11.5" fontWeight="600">
            ₹24,000
          </text>

          <text x={PAD} y={256} fill="#334155" fontFamily="Inter, system-ui, sans-serif" fontSize="11.5" fontWeight="500">
            Website development
          </text>
          <text x={RIGHT_X} y={256} textAnchor="end" fill={E.ink} fontFamily="Inter, system-ui, sans-serif" fontSize="11.5" fontWeight="600">
            ₹32,000
          </text>

          <path d={`M${PAD} 268h${INNER_W}`} stroke={E.line} strokeWidth="1" />

          <text x={PAD} y={290} fill={E.ink} fontFamily="Inter, system-ui, sans-serif" fontSize="12" fontWeight="600">
            Total
          </text>
          <text
            x={RIGHT_X}
            y={290}
            textAnchor="end"
            fill={E.ink}
            fontFamily="Inter, system-ui, sans-serif"
            fontSize="13"
            fontWeight="700"
          >
            ₹56,000
          </text>
        </g>
      </svg>
    </div>
  );
}