import shopsRaw from "@/data/shops.json";
import extendedRaw from "@/data/shops.extended.json";
import type { Shop, ShopExtended, ShopWithExtended } from "@/types/shop";

const shops = shopsRaw as Shop[];
const extendedList = extendedRaw as ShopExtended[];
const extendedMap = new Map<string, ShopExtended>(
  extendedList.map((e) => [e.slug, e])
);

export function getAllShops(): Shop[] {
  return shops;
}

export function getShopsByPrefecture(prefecture: string): Shop[] {
  return shops.filter((s) => s.prefecture === prefecture);
}

export function getShopBySlug(prefecture: string, slug: string): Shop | undefined {
  return shops.find((s) => s.prefecture === prefecture && s.slug === slug);
}

export function getShopExtended(slug: string): ShopExtended | undefined {
  return extendedMap.get(slug);
}

export function getShopWithExtended(prefecture: string, slug: string): ShopWithExtended | undefined {
  const shop = getShopBySlug(prefecture, slug);
  if (!shop) return undefined;
  return { ...shop, extended: extendedMap.get(slug) };
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
