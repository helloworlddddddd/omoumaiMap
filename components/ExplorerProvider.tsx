"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Shop, ShopGenre } from "@/types/shop";
import { filterShops, type ViewportBounds } from "@/lib/filter";

interface ExplorerContextValue {
  allShops: Shop[];
  filteredShops: Shop[];

  query: string;
  setQuery: (q: string) => void;

  genres: ReadonlySet<ShopGenre>;
  toggleGenre: (g: ShopGenre) => void;
  clearGenres: () => void;

  showClosed: boolean;
  setShowClosed: (v: boolean) => void;

  hoveredSlug: string | null;
  setHoveredSlug: (slug: string | null) => void;

  selectedSlug: string | null;
  setSelectedSlug: (slug: string | null) => void;

  pendingViewportBounds: ViewportBounds | null;
  setPendingViewportBounds: (b: ViewportBounds | null) => void;
  appliedViewportBounds: ViewportBounds | null;
  applyViewportFilter: () => void;
  clearViewportFilter: () => void;

  mobileView: "map" | "list";
  setMobileView: (v: "map" | "list") => void;
}

const ExplorerContext = createContext<ExplorerContextValue | null>(null);

export function ExplorerProvider({
  allShops,
  children,
}: {
  allShops: Shop[];
  children: ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [genres, setGenres] = useState<ReadonlySet<ShopGenre>>(new Set());
  const [showClosed, setShowClosed] = useState(false);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [pendingViewportBounds, setPendingViewportBounds] =
    useState<ViewportBounds | null>(null);
  const [appliedViewportBounds, setAppliedViewportBounds] =
    useState<ViewportBounds | null>(null);
  const [mobileView, setMobileView] = useState<"map" | "list">("map");

  const toggleGenre = useCallback((g: ShopGenre) => {
    setGenres((prev) => {
      const next = new Set(prev);
      if (next.has(g)) next.delete(g);
      else next.add(g);
      return next;
    });
  }, []);

  const clearGenres = useCallback(() => setGenres(new Set()), []);

  const applyViewportFilter = useCallback(() => {
    setAppliedViewportBounds(pendingViewportBounds);
  }, [pendingViewportBounds]);

  const clearViewportFilter = useCallback(() => {
    setAppliedViewportBounds(null);
  }, []);

  const filteredShops = useMemo(
    () =>
      filterShops(allShops, {
        query,
        genres,
        showClosed,
        viewportBounds: appliedViewportBounds,
      }),
    [allShops, query, genres, showClosed, appliedViewportBounds],
  );

  const value: ExplorerContextValue = {
    allShops,
    filteredShops,
    query,
    setQuery,
    genres,
    toggleGenre,
    clearGenres,
    showClosed,
    setShowClosed,
    hoveredSlug,
    setHoveredSlug,
    selectedSlug,
    setSelectedSlug,
    pendingViewportBounds,
    setPendingViewportBounds,
    appliedViewportBounds,
    applyViewportFilter,
    clearViewportFilter,
    mobileView,
    setMobileView,
  };

  return (
    <ExplorerContext.Provider value={value}>{children}</ExplorerContext.Provider>
  );
}

export function useExplorer(): ExplorerContextValue {
  const ctx = useContext(ExplorerContext);
  if (!ctx) throw new Error("useExplorer must be used inside <ExplorerProvider>");
  return ctx;
}
