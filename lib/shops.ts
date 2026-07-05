import shopsRaw from "@/data/shops.json";
import type { Shop } from "@/types/shop";

const shops = shopsRaw as Shop[];

export function getAllShops(): Shop[] {
  return shops;
}

export function getShopsByPrefecture(prefecture: string): Shop[] {
  return shops.filter((s) => s.prefecture === prefecture);
}

export function getShopBySlug(prefecture: string, slug: string): Shop | undefined {
  return shops.find((s) => s.prefecture === prefecture && s.slug === slug);
}

export function getAllPrefectures(): { key: string; ja: string; count: number }[] {
  const map = new Map<string, { ja: string; count: number }>();
  for (const s of shops) {
    const cur = map.get(s.prefecture);
    if (cur) {
      cur.count += 1;
    } else {
      map.set(s.prefecture, { ja: s.prefectureJa, count: 1 });
    }
  }
  return [...map.entries()].map(([key, { ja, count }]) => ({ key, ja, count }));
}
