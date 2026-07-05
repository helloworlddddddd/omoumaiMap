import { getStatusStyle } from "@/lib/pinColor";
import type { ShopStatus } from "@/types/shop";

export function StatusBadge({ status }: { status: ShopStatus }) {
  const s = getStatusStyle(status);
  return (
    <span
      className={
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium " +
        s.badgeClass
      }
    >
      <span
        aria-hidden
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ background: s.hex }}
      />
      {s.labelJa}
    </span>
  );
}
