import Link from "next/link";
import type { Shop } from "@/types/shop";

function haversineKm(
  lat1: number, lng1: number,
  lat2: number, lng2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function NearbyShopsSection({
  current,
  allShops,
}: {
  current: Shop;
  allShops: Shop[];
}) {
  const nearby = allShops
    .filter((s) => s.slug !== current.slug)
    .map((s) => ({
      shop: s,
      km: haversineKm(current.lat, current.lng, s.lat, s.lng),
    }))
    .sort((a, b) => a.km - b.km)
    .slice(0, 5);

  if (!nearby.length) return null;

  return (
    <section className="bg-white rounded-lg border border-orange-100 shadow-sm p-4 md:p-5">
      <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-1.5">
        <span aria-hidden>📍</span>周辺のオモウマい店
      </h2>

      <ul className="flex flex-col divide-y divide-gray-100">
        {nearby.map(({ shop, km }) => (
          <li key={shop.slug}>
            <Link
              href={`/${shop.prefecture}/${shop.slug}/`}
              className="flex items-start gap-3 py-2.5 hover:bg-orange-50 -mx-1 px-1 rounded"
            >
              <span className="text-xs text-gray-400 shrink-0 mt-0.5 w-14 text-right">
                {km < 1 ? `${Math.round(km * 1000)}m` : `${km.toFixed(1)}km`}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{shop.name}</p>
                <p className="text-xs text-gray-500 truncate">「{shop.signature}」</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
