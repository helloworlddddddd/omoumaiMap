"use client";

import { useExplorer } from "./ExplorerProvider";
import type { ShopGenre } from "@/types/shop";

const GENRES: { key: ShopGenre; label: string }[] = [
  { key: "ramen", label: "ラーメン" },
  { key: "meat", label: "肉系" },
  { key: "teishoku", label: "定食" },
  { key: "other", label: "その他" },
];

export function SearchAndFilters() {
  const {
    query,
    setQuery,
    genres,
    toggleGenre,
    showClosed,
    setShowClosed,
    filteredShops,
  } = useExplorer();

  return (
    <div className="w-full bg-white/95 backdrop-blur border-b border-orange-100 shadow-sm">
      <div className="px-3 pt-3 pb-2 flex flex-col gap-2">
        <div className="relative">
          <input
            type="search"
            inputMode="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="店名・都道府県・市町村で検索"
            aria-label="検索"
            className="w-full h-11 pl-10 pr-3 rounded-full border border-orange-200 bg-white text-[15px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />
          <span
            aria-hidden
            className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500"
          >
            {/* magnifier */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto -mx-1 px-1 pb-1">
          {GENRES.map((g) => {
            const active = genres.has(g.key);
            return (
              <button
                key={g.key}
                type="button"
                onClick={() => toggleGenre(g.key)}
                className={
                  "shrink-0 h-8 px-3 rounded-full text-sm border transition-colors " +
                  (active
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-gray-700 border-gray-200 hover:border-orange-300")
                }
                aria-pressed={active}
              >
                {g.label}
              </button>
            );
          })}

          <label className="ml-auto shrink-0 inline-flex items-center gap-1.5 text-sm text-gray-700 select-none">
            <input
              type="checkbox"
              checked={showClosed}
              onChange={(e) => setShowClosed(e.target.checked)}
              className="w-4 h-4 accent-orange-500"
            />
            閉業店も表示
          </label>
        </div>

        <div className="text-xs text-gray-500 pt-0.5">
          {filteredShops.length}件表示
        </div>
      </div>
    </div>
  );
}
