import type { Shop, ShopGenre } from "@/types/shop";

export interface FilterInput {
  query: string;
  genres: ReadonlySet<ShopGenre>;
  showClosed: boolean;
  viewportBounds: ViewportBounds | null;
}

export interface ViewportBounds {
  minLng: number;
  minLat: number;
  maxLng: number;
  maxLat: number;
}

export function filterShops(shops: Shop[], input: FilterInput): Shop[] {
  const q = input.query.trim().toLowerCase();
  return shops.filter((s) => {
    if (!input.showClosed && s.status === "closed") return false;
    if (input.genres.size > 0 && !input.genres.has(s.genre)) return false;
    if (q.length > 0) {
      const hay = `${s.name} ${s.prefectureJa} ${s.city} ${s.signature} ${s.genreJa}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (input.viewportBounds) {
      const b = input.viewportBounds;
      if (s.lng < b.minLng || s.lng > b.maxLng) return false;
      if (s.lat < b.minLat || s.lat > b.maxLat) return false;
    }
    return true;
  });
}
