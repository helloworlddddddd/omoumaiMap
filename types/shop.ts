export type ShopStatus = "open" | "closed" | "moved" | "unknown";

export type ShopGenre = "ramen" | "meat" | "teishoku" | "other";

export interface Shop {
  slug: string;
  name: string;
  prefecture: string;
  prefectureJa: string;
  city: string;
  lat: number;
  lng: number;
  status: ShopStatus;
  airedDates: string[];
  signature: string;
  priceNote: string;
  genre: ShopGenre;
  genreJa: string;
  address: string;
  note: string;
}
