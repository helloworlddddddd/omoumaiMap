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

export interface FeaturedMenuItem {
  name: string;
  price?: string;
  priceAsOf?: string;
  note?: string;
}

export interface AdditionalInfoItem {
  label: string;
  value: string;
}

export interface ShopExtended {
  slug: string;
  businessHours?: string;
  closedDays?: string;
  phoneNumber?: string;
  nearestStation?: string;
  parkingInfo?: string;
  crowdedTime?: string;
  featuredMenu?: FeaturedMenuItem[];
  episodeSummary?: string;
  episodeHighlights?: string[];
  additionalInfo?: AdditionalInfoItem[];
  infoAsOf?: string;
  sourceUrls?: string[];
}

export type ShopWithExtended = Shop & { extended?: ShopExtended };
