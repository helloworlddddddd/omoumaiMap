import type { ShopExtended } from "@/types/shop";

export function AccessSection({
  nearestStation,
  parkingInfo,
}: Pick<ShopExtended, "nearestStation" | "parkingInfo">) {
  if (!nearestStation && !parkingInfo) return null;

  return (
    <section className="bg-white rounded-lg border border-orange-100 shadow-sm p-4 md:p-5">
      <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-1.5">
        <span aria-hidden>🚉</span>アクセス
      </h2>

      <dl className="flex flex-col gap-2">
        {nearestStation && (
          <div className="flex gap-3 text-sm">
            <dt className="shrink-0 w-20 text-gray-500">最寄駅</dt>
            <dd className="text-gray-800">{nearestStation}</dd>
          </div>
        )}
        {parkingInfo && (
          <div className="flex gap-3 text-sm">
            <dt className="shrink-0 w-20 text-gray-500">駐車場</dt>
            <dd className="text-gray-800">{parkingInfo}</dd>
          </div>
        )}
      </dl>
    </section>
  );
}
