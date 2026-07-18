import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "免責事項",
  description:
    "オモウマい店Map（非公式）の免責事項。掲載情報の正確性、番組との関係、営業情報の取扱いについて。",
  alternates: {
    canonical: "/disclaimer/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DisclaimerPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 md:px-6 md:py-12">
      <nav className="text-xs text-gray-500 flex flex-wrap gap-1.5">
        <Link href="/" className="hover:text-orange-600">
          トップ
        </Link>
        <span aria-hidden>/</span>
        <span className="text-gray-700">免責事項</span>
      </nav>

      <h1 className="mt-4 text-2xl md:text-3xl font-bold text-gray-900">
        免責事項
      </h1>
      <p className="mt-2 text-xs text-gray-500">最終更新日: 2026年7月18日</p>

      <section className="mt-8 flex flex-col gap-6 text-sm md:text-base text-gray-800 leading-relaxed">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            1. サイトの位置づけについて
          </h2>
          <p className="mt-2">
            オモウマい店Map（非公式）（以下「本サイト」）は、
            テレビ番組の視聴者が個人で運営している非公式のファンサイトです。
            番組の制作会社・放送局・出演者・関係者とは一切関係がなく、
            公式に承認されたサイトでもありません。
            番組名および掲載店舗の店名は、事実の記述としてのみ使用しています。
          </p>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            2. 掲載情報の出典について
          </h2>
          <p className="mt-2">
            本サイトに掲載している店舗の基本情報（店名・住所・放送日等）は、
            テレビ番組内で紹介された内容と、Google マップ（Google Places）上に掲載されている
            公開情報を参照してまとめています。
            これら以外の第三者サイトからの転載は行っていません。
          </p>
          <p className="mt-2">
            店舗の営業時間・定休日・営業ステータス（営業中／閉業）などの営業情報は、
            Google マップに掲載されているデータに準拠しています。
            これらの情報はGoogle側で随時更新されるものであり、
            本サイトが常に最新の状態を保証するものではありません。
          </p>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            3. 情報の正確性・最新性について
          </h2>
          <p className="mt-2">
            本サイトの掲載内容には可能な限り注意を払っておりますが、その正確性・完全性・最新性を
            保証するものではありません。営業時間・定休日・提供メニュー・価格などは
            予告なく変更されることがあり、実際の営業状況と異なる場合があります。
          </p>
          <p className="mt-2">
            <strong>
              店舗へお出かけの際は、必ず店舗の公式情報またはGoogle マップ上の最新表示を事前にご確認ください。
            </strong>
          </p>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            4. 責任の制限
          </h2>
          <p className="mt-2">
            本サイトに掲載された情報を利用したことにより生じた
            いかなる直接的・間接的な損害（お店が閉業していた・営業時間が異なっていた・
            メニューや価格が変更されていた等を含みますがこれらに限りません）についても、
            運営者は責任を負いかねます。
          </p>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            5. 掲載店舗へのお問い合わせについて
          </h2>
          <p className="mt-2">
            本サイトは掲載店舗と直接の関係はありません。
            予約・注文・営業内容に関するお問い合わせを店舗へ直接行われる場合は、
            必ず店舗の公式連絡先をご利用いただき、
            本サイトを引用しての取次依頼などはご遠慮ください。
          </p>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            6. 外部リンクについて
          </h2>
          <p className="mt-2">
            本サイトは外部サイトへのリンクを含む場合があります。
            リンク先の内容やサービスに関するトラブル・損害等について、
            運営者は一切の責任を負いません。リンク先の情報については、
            各リンク先サイトの規約およびプライバシーポリシーをご確認ください。
          </p>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            7. 商標について
          </h2>
          <p className="mt-2">
            本サイトに記載されている番組名・店舗名・企業名等は、
            それぞれの権利者に帰属する商標または登録商標です。
            本サイトはこれらを事実の記述にのみ使用しており、
            権利者との提携・承認・スポンサー関係を示すものではありません。
          </p>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            8. 内容の修正・削除依頼について
          </h2>
          <p className="mt-2">
            掲載店舗の関係者の方等で、掲載内容の修正・削除をご希望される場合は、
            <Link href="/contact" className="text-orange-600 hover:underline">
              お問い合わせページ
            </Link>
            よりご連絡ください。内容を確認のうえ、可能な範囲で速やかに対応いたします。
          </p>
        </div>
      </section>
    </main>
  );
}
