import type { Shop } from "@/types/shop";

interface Props {
  shops: Shop[];
  updatedAt: string;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

export function PrefectureStats({ shops, updatedAt }: Props) {
  const total = shops.length;
  const open = shops.filter((s) => s.status === "open").length;
  const closed = shops.filter((s) => s.status === "closed").length;

  const items: { label: string; value: string; accent?: boolean }[] = [
    { label: "掲載", value: `${total}件`, accent: true },
    { label: "営業中", value: `${open}件` },
    { label: "閉業", value: `${closed}件` },
    { label: "最終更新", value: formatDate(updatedAt) },
  ];

  return (
    <section
      aria-label="集計"
      className="bg-white rounded-lg border border-orange-100 shadow-sm p-3 md:p-4"
    >
      <ul className="grid grid-cols-4 gap-2 md:gap-4">
        {items.map((it) => (
          <li key={it.label} className="text-center">
            <div className="text-[11px] md:text-xs text-gray-500">{it.label}</div>
            <div
              className={
                "mt-0.5 font-bold " +
                (it.accent
                  ? "text-orange-600 text-lg md:text-2xl"
                  : "text-gray-800 text-base md:text-xl")
              }
            >
              {it.value}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
