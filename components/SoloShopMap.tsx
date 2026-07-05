"use client";

import "maplibre-gl/dist/maplibre-gl.css";

import Map, { Marker, NavigationControl } from "react-map-gl/maplibre";
import { getStatusStyle } from "@/lib/pinColor";
import { MAP_STYLE_URL } from "@/lib/mapStyle";
import type { Shop } from "@/types/shop";

export default function SoloShopMap({ shop }: { shop: Shop }) {
  const style = getStatusStyle(shop.status);
  return (
    <div className="relative w-full h-full">
      <Map
        initialViewState={{
          longitude: shop.lng,
          latitude: shop.lat,
          zoom: 14,
        }}
        mapStyle={MAP_STYLE_URL}
        style={{ width: "100%", height: "100%" }}
        attributionControl={{ compact: true }}
      >
        <NavigationControl position="top-right" showCompass={false} />
        <Marker longitude={shop.lng} latitude={shop.lat} anchor="bottom">
          <svg width="30" height="40" viewBox="0 0 26 34" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13 1 C6.4 1 1 6.3 1 12.9 C1 22 13 33 13 33 C13 33 25 22 25 12.9 C25 6.3 19.6 1 13 1 Z"
              fill={style.hex}
              stroke={style.strokeHex}
              strokeWidth={1.5}
            />
            <circle cx="13" cy="13" r="4.2" fill="white" />
          </svg>
        </Marker>
      </Map>
    </div>
  );
}
