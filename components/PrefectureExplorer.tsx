"use client";

import { ExplorerProvider } from "./ExplorerProvider";
import { SearchAndFilters } from "./SearchAndFilters";
import { ShopList } from "./ShopList";
import ShopMapLazy from "./ShopMapLazy";
import type { Shop } from "@/types/shop";

export function PrefectureExplorer({ shops }: { shops: Shop[] }) {
  return (
    <ExplorerProvider allShops={shops}>
      <div className="bg-white rounded-lg border border-orange-100 shadow-sm overflow-hidden">
        <SearchAndFilters />
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,58%)_minmax(0,42%)]">
          <div className="h-72 md:h-[520px] w-full">
            <ShopMapLazy />
          </div>
          <div className="max-h-72 md:max-h-[520px] overflow-y-auto border-t md:border-t-0 md:border-l border-gray-100 bg-orange-50/30">
            <ShopList />
          </div>
        </div>
      </div>
    </ExplorerProvider>
  );
}
