import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";
import { getAllPrefectures, getShopsByPrefecture } from "@/lib/shops";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FONT_FILES = [
  "noto-sans-jp-latin-900-normal.woff",
  "noto-sans-jp-95-900-normal.woff",
  "noto-sans-jp-96-900-normal.woff",
  "noto-sans-jp-97-900-normal.woff",
  "noto-sans-jp-98-900-normal.woff",
  "noto-sans-jp-99-900-normal.woff",
  "noto-sans-jp-100-900-normal.woff",
  "noto-sans-jp-101-900-normal.woff",
  "noto-sans-jp-102-900-normal.woff",
  "noto-sans-jp-103-900-normal.woff",
  "noto-sans-jp-104-900-normal.woff",
  "noto-sans-jp-105-900-normal.woff",
  "noto-sans-jp-106-900-normal.woff",
  "noto-sans-jp-107-900-normal.woff",
  "noto-sans-jp-108-900-normal.woff",
  "noto-sans-jp-109-900-normal.woff",
  "noto-sans-jp-110-900-normal.woff",
  "noto-sans-jp-111-900-normal.woff",
  "noto-sans-jp-112-900-normal.woff",
  "noto-sans-jp-113-900-normal.woff",
  "noto-sans-jp-114-900-normal.woff",
  "noto-sans-jp-115-900-normal.woff",
  "noto-sans-jp-116-900-normal.woff",
  "noto-sans-jp-117-900-normal.woff",
  "noto-sans-jp-118-900-normal.woff",
  "noto-sans-jp-119-900-normal.woff",
];

const FONT_DIR = path.join(process.cwd(), "public", "fonts", "og");

const fonts = FONT_FILES.map((fname) => {
  const buf = fs.readFileSync(path.join(FONT_DIR, fname));
  return {
    name: "NotoSansJP",
    data: buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer,
    weight: 900 as const,
    style: "normal" as const,
  };
});

export function generateStaticParams() {
  return getAllPrefectures().map((p) => ({ prefecture: p.key }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ prefecture: string }>;
}) {
  const { prefecture } = await params;
  const prefectures = getAllPrefectures();
  const pref = prefectures.find((p) => p.key === prefecture);
  const shops = getShopsByPrefecture(prefecture);

  const prefJa = pref?.ja ?? prefecture;
  const count = shops.length;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#111",
          border: "12px solid #f97316",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          fontFamily: "NotoSansJP",
        }}
      >
        <div style={{ fontSize: 48, fontWeight: 900, color: "#f97316", letterSpacing: 4 }}>
          オモウマい店 Map
        </div>
        <div style={{ width: 80, height: 4, background: "#f97316", borderRadius: 2 }} />
        <div style={{ fontSize: 100, fontWeight: 900, color: "#fff" }}>
          {prefJa}
        </div>
        <div style={{ fontSize: 32, color: "#aaa", fontWeight: 700 }}>
          掲載店舗数 {count}店
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
