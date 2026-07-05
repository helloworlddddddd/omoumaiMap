import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllShops, getShopBySlug, getShopsByPrefecture } from "@/lib/shops";
import { loadShopArticle } from "@/lib/content";
import { buildRestaurantJsonLd, JsonLd } from "@/lib/jsonLd";
import { ShopHeaderCard } from "@/components/ShopHeaderCard";
import { RelatedShops } from "@/components/RelatedShops";
import { AdSlot } from "@/components/AdSlot";
import SoloShopMapLazy from "@/components/SoloShopMapLazy";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllShops().map((s) => ({
    prefecture: s.prefecture,
    slug: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ prefecture: string; slug: string }>;
}): Promise<Metadata> {
  const { prefecture, slug } = await params;
  const shop = getShopBySlug(prefecture, slug);
  if (!shop) return {};
  const title = `${shop.name}|オモウマい店で紹介された${shop.prefectureJa}${shop.city}の店`;
  return {
    title,
    description: `${shop.name}(${shop.prefectureJa}${shop.city})の名物は「${shop.signature}」。放送日・営業ステータス・地図・アクセス方法をまとめました。`,
    openGraph: { title },
  };
}

export default async function ShopPage({
  params,
}: {
  params: Promise<{ prefecture: string; slug: string }>;
}) {
  const { prefecture, slug } = await params;
  const shop = getShopBySlug(prefecture, slug);
  if (!shop) notFound();

  const article = await loadShopArticle(slug);
  const related = getShopsByPrefecture(prefecture)
    .filter((s) => s.slug !== slug)
    .slice(0, 5);

  const gmapDirUrl = `https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lng}`;
  const jsonLd = buildRestaurantJsonLd(shop);

  return (
    <main className="mx-auto w-full max-w-3xl px-3 py-4 md:px-6 md:py-8 flex flex-col gap-4">
      <nav className="text-xs text-gray-500 flex flex-wrap gap-1.5">
        <Link href="/" className="hover:text-orange-600">トップ</Link>
        <span aria-hidden>/</span>
        <Link
          href={`/${shop.prefecture}/`}
          className="hover:text-orange-600"
        >
          {shop.prefectureJa}
        </Link>
        <span aria-hidden>/</span>
        <span className="text-gray-700 truncate max-w-[16em]">{shop.name}</span>
      </nav>

      <ShopHeaderCard shop={shop} />

      <AdSlot slotId={`shop-${shop.slug}-top`} format="leaderboard" />

      <section className="bg-white rounded-lg border border-orange-100 shadow-sm overflow-hidden">
        <div className="h-64 md:h-80 w-full">
          <SoloShopMapLazy shop={shop} />
        </div>
        <div className="p-3 md:p-4 flex flex-wrap items-center gap-3 border-t border-gray-100 text-sm">
          <a
            href={gmapDirUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-orange-500 text-white h-9 px-4 font-medium hover:bg-orange-600"
          >
            Googleマップで経路を見る →
          </a>
          <span className="text-xs text-gray-500">
            緯度 {shop.lat.toFixed(4)} / 経度 {shop.lng.toFixed(4)}
          </span>
        </div>
      </section>

      {article && (
        <article className="bg-white rounded-lg border border-orange-100 shadow-sm p-4 md:p-6">
          <header>
            {article.title && (
              <h2 className="text-lg font-bold text-gray-900">{article.title}</h2>
            )}
            <div className="mt-1 text-xs text-gray-500 flex flex-wrap gap-2">
              {article.visitedAt && <span>訪問日: {article.visitedAt}</span>}
              {article.author && <span>by {article.author}</span>}
            </div>
          </header>
          <div
            className="prose prose-sm md:prose-base max-w-none mt-3 text-gray-800 leading-relaxed
              [&>h2]:mt-5 [&>h2]:mb-2 [&>h2]:text-base [&>h2]:font-bold
              [&>h3]:mt-4 [&>h3]:mb-1 [&>h3]:text-sm [&>h3]:font-semibold
              [&>p]:my-2 [&>ul]:my-2 [&>ul]:pl-5 [&>ul>li]:list-disc [&>ol]:my-2 [&>ol]:pl-5 [&>ol>li]:list-decimal"
            dangerouslySetInnerHTML={{ __html: article.html }}
          />
        </article>
      )}

      <AdSlot slotId={`shop-${shop.slug}-bottom`} format="leaderboard" />

      <RelatedShops shops={related} prefectureJa={shop.prefectureJa} />

      <JsonLd data={jsonLd} />
    </main>
  );
}
