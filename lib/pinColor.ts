import type { ShopStatus } from "@/types/shop";

export interface StatusStyle {
  hex: string;
  strokeHex: string;
  badgeClass: string;
  labelJa: string;
}

const STATUS_STYLE: Record<ShopStatus, StatusStyle> = {
  open: {
    hex: "#16a34a",
    strokeHex: "#065f46",
    badgeClass: "bg-green-100 text-green-800 border border-green-300",
    labelJa: "営業中",
  },
  closed: {
    hex: "#6b7280",
    strokeHex: "#374151",
    badgeClass: "bg-gray-100 text-gray-700 border border-gray-300",
    labelJa: "閉業",
  },
  moved: {
    hex: "#f97316",
    strokeHex: "#9a3412",
    badgeClass: "bg-orange-100 text-orange-800 border border-orange-300",
    labelJa: "移転",
  },
  unknown: {
    hex: "#eab308",
    strokeHex: "#854d0e",
    badgeClass: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    labelJa: "情報なし",
  },
};

export function getStatusStyle(status: ShopStatus): StatusStyle {
  return STATUS_STYLE[status];
}

export function pinColorHex(status: ShopStatus): string {
  return STATUS_STYLE[status].hex;
}

export const STATUS_ORDER: ShopStatus[] = ["open", "closed", "moved", "unknown"];
