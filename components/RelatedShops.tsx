import Link from "next/link";
import { StatusBadge } from "./StatusBadge";
import type { Shop } from "@/types/shop";

export function RelatedShops({
  shops,
  prefectureJa,
}: {
  shops: Shop[];
  prefectureJa: string;
}) {
  if (shops.length === 0) return null;
  return (
    <section className="bg-white rounded-lg border border-orange-100 shadow-sm p-4 md:p-6">
      <h2 className="text-base font-bold text-gray-900">
        {prefectureJa}の他の店
      </h2>
      <ul className="mt-3 divide-y divide-gray-100">
        {shops.map((s) => (
          <li key={s.slug} className="py-2">
            <Link
              href={`/${s.prefecture}/${s.slug}/`}
              className="flex items-start justify-between gap-2 hover:text-orange-700"
            >
              <div className="min-w-0">
                <div className="text-sm font-semibold text-gray-900 truncate">
                  {s.name}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {s.city} / {s.genreJa}
                </div>
              </div>
              <StatusBadge status={s.status} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
