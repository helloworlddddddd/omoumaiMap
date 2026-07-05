"use client";

import { useExplorer } from "./ExplorerProvider";
import { ShopCard } from "./ShopCard";
import { AdSlot } from "./AdSlot";

const AD_EVERY = 5;

export function ShopList() {
  const { filteredShops, appliedViewportBounds, clearViewportFilter } = useExplorer();

  if (filteredShops.length === 0) {
    return (
      <div className="p-6 text-center text-sm text-gray-500">
        条件に合う店舗が見つかりませんでした。
        {appliedViewportBounds && (
          <button
            type="button"
            onClick={clearViewportFilter}
            className="block mx-auto mt-3 text-orange-600 underline"
          >
            エリア絞込を解除する
          </button>
        )}
      </div>
    );
  }

  const items: React.ReactNode[] = [];
  filteredShops.forEach((s, i) => {
    items.push(<ShopCard key={s.slug} shop={s} />);
    if ((i + 1) % AD_EVERY === 0 && i !== filteredShops.length - 1) {
      items.push(<AdSlot key={`ad-${i}`} slotId={`top-inline-${i}`} format="inline-card" />);
    }
  });

  return <div className="flex flex-col gap-2 p-3">{items}</div>;
}
