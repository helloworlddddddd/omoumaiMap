import type { MetadataRoute } from "next";
import { getAllShops, getAllPrefectures } from "@/lib/shops";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://omoumai-map.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const shops = getAllShops();
  const prefectures = getAllPrefectures();

  const shopEntries: MetadataRoute.Sitemap = shops.map((s) => ({
    url: `${SITE_URL}/${s.prefecture}/${s.slug}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const prefectureEntries: MetadataRoute.Sitemap = prefectures.map((p) => ({
    url: `${SITE_URL}/${p.key}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...prefectureEntries,
    ...shopEntries,
  ];
}
