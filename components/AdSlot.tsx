import type { CSSProperties } from "react";

export type AdFormat = "inline-card" | "leaderboard" | "square";

interface Props {
  slotId: string;
  format?: AdFormat;
  className?: string;
  label?: string;
}

const SIZE: Record<AdFormat, CSSProperties> = {
  "inline-card": { minHeight: 96 },
  leaderboard: { minHeight: 90 },
  square: { minHeight: 250 },
};

export function AdSlot({ slotId, format = "inline-card", className, label = "AD" }: Props) {
  return (
    <div
      data-ad-slot={slotId}
      className={
        "w-full rounded-md border border-dashed border-gray-300 bg-gray-50 " +
        "flex items-center justify-center text-[11px] text-gray-400 tracking-widest " +
        (className ?? "")
      }
      style={SIZE[format]}
      aria-hidden
    >
      {label}
    </div>
  );
}
