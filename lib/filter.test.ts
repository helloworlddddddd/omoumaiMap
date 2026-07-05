import { describe, expect, it } from "vitest";
import { filterShops } from "./filter";
import type { Shop } from "@/types/shop";

const base: Shop = {
  slug: "test-ramen",
  name: "らーめん専門ながしま",
  prefecture: "saitama",
  prefectureJa: "埼玉県",
  city: "吉見町",
  lat: 36.04,
  lng: 139.45,
  status: "open",
  airedDates: [],
  signature: "絶品ラーメン",
  priceNote: "",
  genre: "ramen",
  genreJa: "ラーメン",
  address: "",
  note: "",
};

const opts = { genres: new Set<Shop["genre"]>(), showClosed: false, viewportBounds: null };

describe("filterShops — かな/カナ正規化", () => {
  it("ひらがなで検索してカタカナ名物にヒット", () => {
    const result = filterShops([base], { ...opts, query: "らーめん" });
    expect(result).toHaveLength(1);
  });

  it("カタカナで検索してひらがな店名にヒット", () => {
    const result = filterShops([base], { ...opts, query: "ラーメン専門" });
    expect(result).toHaveLength(1);
  });

  it("半角カナで検索してヒット", () => {
    const result = filterShops([base], { ...opts, query: "ﾗｰﾒﾝ" });
    expect(result).toHaveLength(1);
  });

  it("マッチしないクエリは0件", () => {
    const result = filterShops([base], { ...opts, query: "長野" });
    expect(result).toHaveLength(0);
  });
});
