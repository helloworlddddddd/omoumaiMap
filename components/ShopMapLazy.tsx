"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

const ShopMap = dynamic(() => import("./ShopMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full grid place-items-center bg-orange-50/40 text-sm text-gray-500">
      地図を読み込み中…
    </div>
  ),
});

export default function ShopMapLazy(props: ComponentProps<typeof ShopMap>) {
  return <ShopMap {...props} />;
}
