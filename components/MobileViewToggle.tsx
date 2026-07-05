"use client";

import { useExplorer } from "./ExplorerProvider";

export function MobileViewToggle() {
  const { mobileView, setMobileView, filteredShops } = useExplorer();
  return (
    <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex bg-white/95 backdrop-blur border border-orange-200 rounded-full shadow-md p-1">
      <button
        type="button"
        onClick={() => setMobileView("map")}
        aria-pressed={mobileView === "map"}
        className={
          "h-11 px-5 rounded-full text-sm font-medium transition-colors " +
          (mobileView === "map" ? "bg-orange-500 text-white" : "text-gray-700")
        }
      >
        マップ
      </button>
      <button
        type="button"
        onClick={() => setMobileView("list")}
        aria-pressed={mobileView === "list"}
        className={
          "h-11 px-5 rounded-full text-sm font-medium transition-colors " +
          (mobileView === "list" ? "bg-orange-500 text-white" : "text-gray-700")
        }
      >
        リスト ({filteredShops.length})
      </button>
    </div>
  );
}
