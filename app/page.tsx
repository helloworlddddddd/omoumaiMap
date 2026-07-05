import type { Metadata } from "next";
import { ExplorerProvider } from "@/components/ExplorerProvider";
import { ExplorerLayout } from "@/components/ExplorerLayout";
import { getAllShops } from "@/lib/shops";

export const metadata: Metadata = {
  title: "オモウマい店マップ|紹介された飲食店を地図と一覧で探す",
  description:
    "テレビ番組で紹介された飲食店を、都道府県・ジャンル・営業ステータスから地図と一覧で探せます。",
};

export default function HomePage() {
  const shops = getAllShops();
  return (
    <ExplorerProvider allShops={shops}>
      <ExplorerLayout />
    </ExplorerProvider>
  );
}
