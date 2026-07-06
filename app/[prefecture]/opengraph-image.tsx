import { ImageResponse } from "next/og";
import { getAllPrefectures, getShopsByPrefecture } from "@/lib/shops";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(): Promise<ArrayBuffer> {
  const css = await fetch(
    "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@900",
    { headers: { "User-Agent": "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)" } }
  ).then((r) => r.text());
  const match = css.match(/src: url\((.+)\) format\('truetype'\)/);
  if (!match) throw new Error("Font URL not found");
  return fetch(match[1]).then((r) => r.arrayBuffer());
}

export function generateStaticParams() {
  return getAllPrefectures().map((p) => ({ prefecture: p.key }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ prefecture: string }>;
}) {
  const { prefecture } = await params;
  const font = await loadFont();
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
    {
      ...size,
      fonts: [{ name: "NotoSansJP", data: font, style: "normal", weight: 900 }],
    }
  );
}
