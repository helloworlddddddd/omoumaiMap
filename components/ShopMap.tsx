"use client";

import "maplibre-gl/dist/maplibre-gl.css";

import { useCallback, useEffect, useMemo, useRef } from "react";
import Map, {
  Marker,
  NavigationControl,
  Popup,
  type MapRef,
  type ViewStateChangeEvent,
} from "react-map-gl/maplibre";
import Link from "next/link";
import { useExplorer } from "./ExplorerProvider";
import { getStatusStyle, STATUS_ORDER } from "@/lib/pinColor";
import { DEFAULT_CENTER, DEFAULT_ZOOM, MAP_STYLE_URL } from "@/lib/mapStyle";
import type { Shop } from "@/types/shop";

interface Props {
  className?: string;
  initialShops?: Shop[];
  showAreaResearchButton?: boolean;
  fitToFiltered?: boolean;
}

export default function ShopMap({
  className,
  initialShops,
  showAreaResearchButton = true,
  fitToFiltered = true,
}: Props) {
  const {
    filteredShops,
    hoveredSlug,
    setHoveredSlug,
    selectedSlug,
    setSelectedSlug,
    setPendingViewportBounds,
    appliedViewportBounds,
    pendingViewportBounds,
    applyViewportFilter,
    clearViewportFilter,
  } = useExplorer();

  const shops = initialShops ?? filteredShops;
  const ref = useRef<MapRef | null>(null);
  const selectedShop = useMemo(
    () => shops.find((s) => s.slug === selectedSlug) ?? null,
    [shops, selectedSlug],
  );

  useEffect(() => {
    if (!fitToFiltered) return;
    const map = ref.current;
    if (!map || filteredShops.length === 0) return;
    if (filteredShops.length === 1) {
      const s = filteredShops[0];
      map.easeTo({ center: [s.lng, s.lat], zoom: 12, duration: 500 });
      return;
    }
    const lats = filteredShops.map((s) => s.lat);
    const lngs = filteredShops.map((s) => s.lng);
    const bounds: [[number, number], [number, number]] = [
      [Math.min(...lngs), Math.min(...lats)],
      [Math.max(...lngs), Math.max(...lats)],
    ];
    map.fitBounds(bounds, { padding: 60, duration: 500, maxZoom: 12 });
  }, [filteredShops, fitToFiltered]);

  const handleMoveEnd = useCallback(
    (e: ViewStateChangeEvent) => {
      // programmatic moves (fitBounds/easeTo from our own effect) have no originalEvent
      if (!e.originalEvent) return;
      const map = ref.current?.getMap();
      if (!map) return;
      const b = map.getBounds();
      setPendingViewportBounds({
        minLng: b.getWest(),
        minLat: b.getSouth(),
        maxLng: b.getEast(),
        maxLat: b.getNorth(),
      });
    },
    [setPendingViewportBounds],
  );

  const showResearch =
    showAreaResearchButton &&
    !!pendingViewportBounds &&
    JSON.stringify(pendingViewportBounds) !== JSON.stringify(appliedViewportBounds);

  return (
    <div className={"relative w-full h-full " + (className ?? "")}>
      <Map
        ref={ref}
        initialViewState={{
          longitude: DEFAULT_CENTER[0],
          latitude: DEFAULT_CENTER[1],
          zoom: DEFAULT_ZOOM,
        }}
        mapStyle={MAP_STYLE_URL}
        onMoveEnd={handleMoveEnd}
        onClick={() => setSelectedSlug(null)}
        style={{ width: "100%", height: "100%" }}
      >
        <NavigationControl position="top-right" showCompass={false} />

        {shops.map((s) => {
          const style = getStatusStyle(s.status);
          const isHovered = hoveredSlug === s.slug;
          const isSelected = selectedSlug === s.slug;
          const scale = isHovered || isSelected ? 1.25 : 1;
          return (
            <Marker
              key={s.slug}
              longitude={s.lng}
              latitude={s.lat}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setSelectedSlug(s.slug);
              }}
            >
              <button
                type="button"
                aria-label={s.name}
                onMouseEnter={() => setHoveredSlug(s.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                style={{ transform: `scale(${scale})`, transformOrigin: "50% 100%" }}
                className="transition-transform duration-150 drop-shadow"
              >
                <PinSvg fill={style.hex} stroke={style.strokeHex} emphasized={isSelected} />
              </button>
            </Marker>
          );
        })}

        {selectedShop && (
          <Popup
            longitude={selectedShop.lng}
            latitude={selectedShop.lat}
            anchor="top"
            offset={16}
            closeOnClick={false}
            onClose={() => setSelectedSlug(null)}
            maxWidth="260px"
          >
            <div className="p-1">
              <div className="font-semibold text-[13px] leading-tight text-gray-900">
                {selectedShop.name}
              </div>
              <div className="text-[11px] text-gray-500 mt-0.5">
                {selectedShop.prefectureJa} / {selectedShop.city}
              </div>
              <div className="text-[12px] text-gray-700 mt-1">
                {selectedShop.signature}
              </div>
              <Link
                href={`/${selectedShop.prefecture}/${selectedShop.slug}/`}
                className="inline-block mt-2 text-[12px] text-orange-600 hover:underline"
              >
                詳細を見る →
              </Link>
            </div>
          </Popup>
        )}
      </Map>

      {/* 凡例 */}
      <div className="absolute left-3 bottom-3 rounded-md bg-white/95 border border-gray-200 shadow px-2 py-1.5 text-[11px] text-gray-700 pointer-events-none">
        <div className="font-semibold text-gray-800 mb-0.5">営業ステータス</div>
        <ul className="flex flex-col gap-0.5">
          {STATUS_ORDER.map((s) => {
            const st = getStatusStyle(s);
            return (
              <li key={s} className="flex items-center gap-1.5">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full border"
                  style={{ background: st.hex, borderColor: st.strokeHex }}
                />
                {st.labelJa}
              </li>
            );
          })}
        </ul>
      </div>

      {showResearch && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          <button
            type="button"
            onClick={applyViewportFilter}
            className="rounded-full bg-white shadow-md border border-orange-200 px-4 h-9 text-sm font-medium text-orange-700 hover:bg-orange-50"
          >
            このエリアで再検索
          </button>
          {appliedViewportBounds && (
            <button
              type="button"
              onClick={clearViewportFilter}
              className="rounded-full bg-white/90 shadow border border-gray-200 px-3 h-9 text-sm text-gray-600 hover:bg-gray-50"
            >
              解除
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function PinSvg({
  fill,
  stroke,
  emphasized,
}: {
  fill: string;
  stroke: string;
  emphasized: boolean;
}) {
  const w = emphasized ? 30 : 26;
  const h = emphasized ? 40 : 34;
  return (
    <svg width={w} height={h} viewBox="0 0 26 34" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13 1 C6.4 1 1 6.3 1 12.9 C1 22 13 33 13 33 C13 33 25 22 25 12.9 C25 6.3 19.6 1 13 1 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={1.5}
      />
      <circle cx="13" cy="13" r="4.2" fill="white" />
    </svg>
  );
}
