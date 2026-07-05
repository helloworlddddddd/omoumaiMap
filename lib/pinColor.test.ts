import { describe, expect, it } from "vitest";
import { getStatusStyle, pinColorHex, STATUS_ORDER } from "./pinColor";

describe("pinColor", () => {
  it("returns distinct hex per status", () => {
    const hexes = STATUS_ORDER.map(pinColorHex);
    expect(new Set(hexes).size).toBe(STATUS_ORDER.length);
  });

  it("uses green for open", () => {
    expect(pinColorHex("open")).toBe("#16a34a");
  });

  it("uses gray for closed", () => {
    expect(pinColorHex("closed")).toBe("#6b7280");
  });

  it("uses orange for moved", () => {
    expect(pinColorHex("moved")).toBe("#f97316");
  });

  it("uses yellow for unknown", () => {
    expect(pinColorHex("unknown")).toBe("#eab308");
  });

  it("returns Japanese label for each status", () => {
    expect(getStatusStyle("open").labelJa).toBe("営業中");
    expect(getStatusStyle("closed").labelJa).toBe("閉業");
    expect(getStatusStyle("moved").labelJa).toBe("移転");
    expect(getStatusStyle("unknown").labelJa).toBe("情報なし");
  });

  it("returns badge tailwind class for each status", () => {
    for (const s of STATUS_ORDER) {
      expect(getStatusStyle(s).badgeClass).toMatch(/bg-\w+-100/);
    }
  });
});
