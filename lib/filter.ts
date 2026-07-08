import type { Shop, ShopGenre } from "@/types/shop";

export type SortOrder = "aired-desc" | "aired-asc" | "kana";

export interface FilterInput {
  query: string;
  genres: ReadonlySet<ShopGenre>;
  prefecture: string | null;
  showClosed: boolean;
  viewportBounds: ViewportBounds | null;
  sortOrder: SortOrder;
}

export interface ViewportBounds {
  minLng: number;
  minLat: number;
  maxLng: number;
  maxLat: number;
}

function normalizeJP(str: string): string {
  return str
    .normalize("NFKC")
    .replace(/[ぁ-ゖ]/g, (c) =>
      String.fromCharCode(c.charCodeAt(0) + 0x60),
    )
    .toLowerCase();
}

function latestAired(s: Shop): string {
  if (!s.airedDates.length) return "";
  let max = s.airedDates[0];
  for (const d of s.airedDates) if (d > max) max = d;
  return max;
}

function earliestAired(s: Shop): string {
  if (!s.airedDates.length) return "9999-99-99";
  let min = s.airedDates[0];
  for (const d of s.airedDates) if (d < min) min = d;
  return min;
}

function sortShops(shops: Shop[], order: SortOrder): Shop[] {
  const arr = [...shops];
  if (order === "aired-desc") {
    arr.sort((a, b) => latestAired(b).localeCompare(latestAired(a)));
  } else if (order === "aired-asc") {
    arr.sort((a, b) => earliestAired(a).localeCompare(earliestAired(b)));
  } else if (order === "kana") {
    arr.sort((a, b) => a.name.localeCompare(b.name, "ja"));
  }
  return arr;
}

export function filterShops(shops: Shop[], input: FilterInput): Shop[] {
  const q = normalizeJP(input.query.trim());
  const filtered = shops.filter((s) => {
    if (!input.showClosed && s.status === "closed") return false;
    if (input.genres.size > 0 && !input.genres.has(s.genre)) return false;
    if (input.prefecture && s.prefecture !== input.prefecture) return false;
    if (q.length > 0) {
      const hay = normalizeJP(
        `${s.name} ${s.prefectureJa} ${s.city} ${s.signature} ${s.genreJa}`,
      );
      if (!hay.includes(q)) return false;
    }
    if (input.viewportBounds) {
      const b = input.viewportBounds;
      if (s.lng < b.minLng || s.lng > b.maxLng) return false;
      if (s.lat < b.minLat || s.lat > b.maxLat) return false;
    }
    return true;
  });
  return sortShops(filtered, input.sortOrder);
}
