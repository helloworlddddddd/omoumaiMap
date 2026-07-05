import type { Shop } from "@/types/shop";

export function buildRestaurantJsonLd(shop: Shop, pageUrl?: string): Record<string, unknown> {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: shop.name,
    address: {
      "@type": "PostalAddress",
      addressCountry: "JP",
      addressRegion: shop.prefectureJa,
      addressLocality: shop.city,
      streetAddress: shop.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: shop.lat,
      longitude: shop.lng,
    },
    servesCuisine: shop.genreJa,
  };
  if (pageUrl) jsonLd.url = pageUrl;
  return jsonLd;
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify is safe here (no user-controlled HTML), and we render as-is
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
