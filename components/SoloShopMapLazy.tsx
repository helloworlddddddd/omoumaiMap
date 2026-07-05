"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

const SoloShopMap = dynamic(() => import("./SoloShopMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full grid place-items-center bg-orange-50/40 text-sm text-gray-500">
      地図を読み込み中…
    </div>
  ),
});

export default function SoloShopMapLazy(props: ComponentProps<typeof SoloShopMap>) {
  return <SoloShopMap {...props} />;
}
