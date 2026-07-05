import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPrefectures, getShopsByPrefecture } from "@/lib/shops";
import { PrefectureStats } from "@/components/PrefectureStats";
import { PrefectureExplorer } from "@/components/PrefectureExplorer";
import { AdSlot } from "@/components/AdSlot";

const BUILT_AT = new Date().toISOString();

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPrefectures().map((p) => ({ prefecture: p.key }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ prefecture: string }>;
}): Promise<Metadata> {
  const { prefecture } = await params;
  const shops = getShopsByPrefecture(prefecture);
  if (shops.length === 0) return {};
  const prefectureJa = shops[0].prefectureJa;
  const title = `オモウマい店 ${prefectureJa}|紹介された店一覧マップ`;
  return {
    title,
    description: `${prefectureJa}でテレビ番組に紹介された飲食店${shops.length}件を地図と一覧で紹介。営業ステータスやジャンル、放送日で絞り込みできます。`,
    openGraph: { title },
  };
}

export default async function PrefecturePage({
  params,
}: {
  params: Promise<{ prefecture: string }>;
}) {
  const { prefecture } = await params;
  const shops = getShopsByPrefecture(prefecture);
  if (shops.length === 0) notFound();

  const prefectureJa = shops[0].prefectureJa;

  return (
    <main className="mx-auto w-full max-w-5xl px-3 py-4 md:px-6 md:py-8 flex flex-col gap-4">
      <nav className="text-xs text-gray-500 flex flex-wrap gap-1.5">
        <Link href="/" className="hover:text-orange-600">トップ</Link>
        <span aria-hidden>/</span>
        <span className="text-gray-700">{prefectureJa}</span>
      </nav>

      <header>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
          オモウマい店で紹介された{prefectureJa}の店一覧・マップ
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {prefectureJa}の名店を、営業ステータス・ジャンルで絞り込みながらマップで探せます。
        </p>
      </header>

      <PrefectureStats shops={shops} updatedAt={BUILT_AT} />

      <AdSlot slotId={`pref-${prefecture}-top`} format="leaderboard" />

      <PrefectureExplorer shops={shops} />
    </main>
  );
}
