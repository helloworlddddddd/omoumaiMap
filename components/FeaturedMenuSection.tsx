import type { FeaturedMenuItem } from "@/types/shop";

export function FeaturedMenuSection({ menu }: { menu: FeaturedMenuItem[] }) {
  if (!menu.length) return null;

  return (
    <section className="bg-white rounded-lg border border-orange-100 shadow-sm p-4 md:p-5">
      <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-1.5">
        <span aria-hidden>🍜</span>番組で紹介されたメニュー
      </h2>

      <div className="divide-y divide-gray-100">
        {menu.map((item, i) => (
          <div key={i} className="py-2.5 flex justify-between items-start gap-3">
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium text-gray-800">{item.name}</span>
              {item.note && (
                <p className="text-xs text-gray-500 mt-0.5">{item.note}</p>
              )}
            </div>
            {item.price && (
              <div className="text-right shrink-0">
                <span className="text-sm font-semibold text-orange-600">
                  {item.price}
                </span>
                {item.priceAsOf && (
                  <p className="text-xs text-gray-400">{item.priceAsOf}時点</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs text-gray-400">
        ※ 価格は放送・取材当時のものです。現在と異なる場合があります。
      </p>
    </section>
  );
}
