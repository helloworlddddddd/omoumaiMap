import { StatusBadge } from "./StatusBadge";
import type { Shop } from "@/types/shop";

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

export function ShopHeaderCard({ shop }: { shop: Shop }) {
  return (
    <section className="bg-white rounded-lg border border-orange-100 shadow-sm p-4 md:p-6">
      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
        <span>{shop.prefectureJa}</span>
        <span aria-hidden>·</span>
        <span>{shop.city}</span>
        <StatusBadge status={shop.status} />
      </div>

      <h1 className="mt-2 text-xl md:text-2xl font-bold text-gray-900 leading-tight">
        {shop.name}
      </h1>

      <p className="mt-2 text-[15px] md:text-base text-gray-800 leading-relaxed">
        {shop.signature}
      </p>

      <dl className="mt-4 grid grid-cols-[6em_1fr] gap-y-2 gap-x-3 text-sm">
        <dt className="text-gray-500">ジャンル</dt>
        <dd className="text-orange-600 font-semibold">{shop.genreJa}</dd>

        {shop.priceNote && (
          <>
            <dt className="text-gray-500">価格</dt>
            <dd className="text-gray-800">{shop.priceNote}</dd>
          </>
        )}

        {shop.airedDates.length > 0 && (
          <>
            <dt className="text-gray-500">放送日</dt>
            <dd className="text-gray-800">
              {shop.airedDates.map(formatDate).join(" / ")}
            </dd>
          </>
        )}

        <dt className="text-gray-500">住所</dt>
        <dd className="text-gray-800 break-all">{shop.address}</dd>

        {shop.note && (
          <>
            <dt className="text-gray-500">備考</dt>
            <dd className="text-gray-800">{shop.note}</dd>
          </>
        )}
      </dl>
    </section>
  );
}
