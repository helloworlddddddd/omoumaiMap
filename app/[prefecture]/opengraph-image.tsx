import { ImageResponse } from "next/og";
import { getAllPrefectures, getShopsByPrefecture } from "@/lib/shops";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// OG画像で使う文字だけのサブセットを取得
const SUBSET_TEXT =
  "Mapいウオマモ三井京佐児兵分北千取口和城埼大奈媛宮富山岐岡岩島崎川広店府庫形徳愛手掲数新木本東栃根梨森歌沖海滋潟熊玉田県知石神福秋縄群舗良茨葉賀載道都重野長阜阪青静香馬高鳥鹿";

async function loadFont(): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@900&text=${encodeURIComponent(SUBSET_TEXT)}`;
  const css = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    },
  }).then((r) => r.text());

  const match = css.match(/src: url\((.+?)\) format\('woff2'\)/);
  if (!match) throw new Error("Font URL not found in CSS");
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
  const [font, prefectures] = await Promise.all([loadFont(), Promise.resolve(getAllPrefectures())]);
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
