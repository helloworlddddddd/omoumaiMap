import type { FeatureCollection, Feature, Point } from "geojson";
import type { Shop } from "@/types/shop";

export interface ShopProperties {
  slug: string;
  name: string;
  prefecture: string;
  prefectureJa: string;
  city: string;
  status: Shop["status"];
  genre: Shop["genre"];
  genreJa: string;
  signature: string;
  priceNote: string;
  airedDates: string[];
}

export type ShopFeature = Feature<Point, ShopProperties>;
export type ShopFeatureCollection = FeatureCollection<Point, ShopProperties>;

export function shopsToGeoJSON(shops: Shop[]): ShopFeatureCollection {
  return {
    type: "FeatureCollection",
    features: shops.map(shopToFeature),
  };
}

export function shopToFeature(shop: Shop): ShopFeature {
  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [shop.lng, shop.lat],
    },
    properties: {
      slug: shop.slug,
      name: shop.name,
      prefecture: shop.prefecture,
      prefectureJa: shop.prefectureJa,
      city: shop.city,
      status: shop.status,
      genre: shop.genre,
      genreJa: shop.genreJa,
      signature: shop.signature,
      priceNote: shop.priceNote,
      airedDates: shop.airedDates,
    },
  };
}
