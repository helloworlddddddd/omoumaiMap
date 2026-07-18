import type { Metadata } from "next";
import Link from "next/link";
import { getAllShops } from "@/lib/shops";

export const metadata: Metadata = {
  title: "運営者情報",
  description:
    "オモウマい店Map（非公式）の運営者情報。サイトの目的、掲載データの出典、運営者連絡先について。",
  alternates: {
    canonical: "/about/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  const shopCount = getAllShops().length;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 md:px-6 md:py-12">
      <nav className="text-xs text-gray-500 flex flex-wrap gap-1.5">
        <Link href="/" className="hover:text-orange-600">
          トップ
        </Link>
        <span aria-hidden>/</span>
        <span className="text-gray-700">運営者情報</span>
      </nav>

      <h1 className="mt-4 text-2xl md:text-3xl font-bold text-gray-900">
        運営者情報
      </h1>

      <section className="mt-8 flex flex-col gap-6 text-sm md:text-base text-gray-800 leading-relaxed">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            サイトについて
          </h2>
          <p className="mt-2">
            「オモウマい店Map（非公式）」は、テレビ番組で紹介された全国の飲食店を、
            地図と一覧で一元的に探せるようにまとめた個人運営の非公式ファンサイトです。
            現在 {shopCount} 店舗を掲載しています。
          </p>
          <p className="mt-2">
            番組を観て「あの店、どこにあるんだっけ？」と気になった時や、
            旅行・出張のついでに寄れるお店を探したい時に、店名・住所・営業ステータス・地図・アクセスを
            まとめてすばやく確認できることを目指して運営しています。
          </p>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            番組との関係
          </h2>
          <p className="mt-2">
            本サイトは番組の視聴者が個人で運営している非公式サイトであり、
            番組の制作会社・放送局・出演者・関係者とは一切関係がありません。
            公式に承認されたサイトでもありません。
            番組名や店舗名は事実の記述としてのみ使用しています。
          </p>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            掲載データの出典
          </h2>
          <p className="mt-2">
            店舗の基本情報（店名・住所・放送日等）は、
            テレビ番組内で紹介された内容と、Google マップ（Google Places）上に掲載されている
            公開情報を参照してまとめています。
            営業時間・定休日・営業ステータスは Google マップに準拠しています。
          </p>
          <p className="mt-2">
            これら以外の第三者サイトからの情報転載は行っていません。
            情報の取扱いの詳細は
            <Link
              href="/disclaimer"
              className="text-orange-600 hover:underline"
            >
              免責事項
            </Link>
            もあわせてご確認ください。
          </p>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            運営者情報
          </h2>
          <dl className="mt-3 grid grid-cols-[8em_1fr] gap-y-2 gap-x-4 text-sm md:text-base">
            <dt className="text-gray-500">サイト名</dt>
            <dd>オモウマい店Map（非公式）</dd>

            <dt className="text-gray-500">URL</dt>
            <dd>
              <a
                href="https://omoumai-map.com"
                className="text-orange-600 hover:underline"
              >
                https://omoumai-map.com
              </a>
            </dd>

            <dt className="text-gray-500">運営者</dt>
            <dd>オモウマい店Map運営</dd>

            <dt className="text-gray-500">所在地</dt>
            <dd>
              〒174-0072
              <br />
              東京都板橋区南常盤台1-11-6
              <br />
              レフア南常盤台101号室
            </dd>

            <dt className="text-gray-500">連絡先</dt>
            <dd>
              <Link
                href="/contact"
                className="text-orange-600 hover:underline"
              >
                お問い合わせページ
              </Link>
              よりご連絡ください
            </dd>

            <dt className="text-gray-500">開設</dt>
            <dd>2026年</dd>
          </dl>
        </div>
      </section>
    </main>
  );
}
