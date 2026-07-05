"use client";

import { useExplorer } from "./ExplorerProvider";
import { SearchAndFilters } from "./SearchAndFilters";
import { MobileViewToggle } from "./MobileViewToggle";
import { ShopList } from "./ShopList";
import ShopMapLazy from "./ShopMapLazy";

export function ExplorerLayout() {
  const { mobileView } = useExplorer();

  return (
    <div className="h-[100dvh] flex flex-col">
      <div className="sticky top-0 z-20">
        <SearchAndFilters />
      </div>

      <div className="flex-1 min-h-0 md:grid md:grid-cols-[minmax(0,58%)_minmax(0,42%)]">
        {/* Map area */}
        <div
          className={
            "relative h-full min-h-0 " +
            (mobileView === "map" ? "block" : "hidden md:block")
          }
        >
          <ShopMapLazy />
        </div>

        {/* List area */}
        <div
          className={
            "relative h-full min-h-0 overflow-y-auto border-l border-gray-100 bg-orange-50/30 " +
            (mobileView === "list" ? "block" : "hidden md:block")
          }
        >
          <ShopList />
        </div>
      </div>

      <MobileViewToggle />
    </div>
  );
}
