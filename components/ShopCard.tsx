"use client";

import Link from "next/link";
import { useExplorer } from "./ExplorerProvider";
import { StatusBadge } from "./StatusBadge";
import type { Shop } from "@/types/shop";

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

export function ShopCard({ shop }: { shop: Shop }) {
  const { hoveredSlug, setHoveredSlug, selectedSlug } = useExplorer();
  const isHovered = hoveredSlug === shop.slug;
  const isSelected = selectedSlug === shop.slug;
  const lastAired = shop.airedDates[shop.airedDates.length - 1];

  return (
    <Link
      href={`/${shop.prefecture}/${shop.slug}/`}
      onMouseEnter={() => setHoveredSlug(shop.slug)}
      onMouseLeave={() => setHoveredSlug(null)}
      className={
        "block rounded-lg border bg-white p-3 transition-colors " +
        (isHovered || isSelected
          ? "border-orange-400 bg-orange-50/60"
          : "border-gray-200 hover:border-orange-300")
      }
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold text-gray-900 truncate">
            {shop.name}
          </h3>
          <p className="text-[12px] text-gray-500 mt-0.5 truncate">
            {shop.prefectureJa} / {shop.city}
          </p>
        </div>
        <StatusBadge status={shop.status} />
      </div>

      <p className="text-[13px] text-gray-700 mt-2 line-clamp-2">{shop.signature}</p>

      <div className="flex items-center justify-between mt-2 text-[11px] text-gray-500">
        <span className="inline-flex items-center gap-1">
          <span className="text-orange-500 font-semibold">{shop.genreJa}</span>
          {shop.priceNote && <span className="text-gray-400">/ {shop.priceNote}</span>}
        </span>
        {lastAired && <span>放送 {formatDate(lastAired)}</span>}
      </div>
    </Link>
  );
}
