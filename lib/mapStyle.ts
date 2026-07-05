const OPENFREEMAP_LIBERTY = "https://tiles.openfreemap.org/styles/liberty";

export const MAP_STYLE_URL =
  process.env.NEXT_PUBLIC_MAP_STYLE_URL ?? OPENFREEMAP_LIBERTY;

export const DEFAULT_CENTER: [number, number] = [138.0, 36.0];
export const DEFAULT_ZOOM = 5;
