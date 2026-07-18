import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "オモウマい店Map（非公式）のプライバシーポリシー。Cookie、アクセス解析、広告配信の取扱いについて。",
  alternates: {
    canonical: "/privacy/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 md:px-6 md:py-12">
      <nav className="text-xs text-gray-500 flex flex-wrap gap-1.5">
        <Link href="/" className="hover:text-orange-600">
          トップ
        </Link>
        <span aria-hidden>/</span>
        <span className="text-gray-700">プライバシーポリシー</span>
      </nav>

      <h1 className="mt-4 text-2xl md:text-3xl font-bold text-gray-900">
        プライバシーポリシー
      </h1>
      <p className="mt-2 text-xs text-gray-500">最終更新日: 2026年7月18日</p>

      <section className="mt-8 flex flex-col gap-6 text-sm md:text-base text-gray-800 leading-relaxed">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            1. 個人情報の取得について
          </h2>
          <p className="mt-2">
            オモウマい店Map（非公式）（以下「本サイト」）は、ユーザーが本サイトを利用する際に、
            氏名・住所・電話番号・メールアドレス等の個人情報を直接取得することはありません。
            ただし、後述のCookie・アクセス解析・広告配信の仕組みを通じて、
            匿名の利用状況データが取得される場合があります。
          </p>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            2. Cookie（クッキー）について
          </h2>
          <p className="mt-2">
            本サイトでは、利便性向上および利用状況の把握のため、Cookieを使用することがあります。
            Cookieは、ユーザーがサイトを訪問した際にブラウザに保存される小さなテキストファイルであり、
            個人を直接特定する情報は含みません。
          </p>
          <p className="mt-2">
            ユーザーはブラウザの設定によってCookieの受け入れを拒否・無効化することができます。
            ただしその場合、本サイトの一部機能が正しく動作しない可能性があります。
          </p>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            3. アクセス解析ツールについて
          </h2>
          <p className="mt-2">
            本サイトは、サイト利用状況の把握のためにGoogle社の提供するアクセス解析ツール
            「Google Analytics」等を利用する場合があります。Google Analyticsは
            トラフィックデータの収集のためにCookieを使用しており、収集されるデータは匿名化されています。
            この機能はCookieを無効にすることで収集を拒否できます。
          </p>
          <p className="mt-2">
            Google Analyticsの利用規約およびプライバシーポリシーの詳細については、
            Google社のWebサイトをご確認ください。
          </p>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            4. 広告配信について
          </h2>
          <p className="mt-2">
            本サイトは、第三者配信の広告サービス「Google AdSense」を利用する場合があります。
            広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、
            当サイトや他サイトへのアクセス情報（氏名、住所、メールアドレス、電話番号は含まれません）を利用することがあります。
          </p>
          <p className="mt-2">
            Google社によるパーソナライズ広告の無効化や、Cookie利用の詳細については、
            Google社の広告設定ページ（
            <a
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:underline"
            >
              https://adssettings.google.com/
            </a>
            ）をご確認ください。
          </p>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            5. 免責事項
          </h2>
          <p className="mt-2">
            本サイトに掲載されている情報の正確性・完全性・最新性については、可能な限り注意を払っておりますが、
            これを保証するものではありません。本サイトの情報を利用したことによって生じたいかなる損害についても、
            運営者は責任を負いかねます。詳細は
            <Link href="/disclaimer" className="text-orange-600 hover:underline">
              免責事項
            </Link>
            のページをご参照ください。
          </p>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            6. 著作権について
          </h2>
          <p className="mt-2">
            本サイトに掲載されているテキスト・画像等のコンテンツの著作権は、
            運営者または正当な権利者に帰属します。
            引用の範囲を超えた無断転載・複製はご遠慮ください。
          </p>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            7. プライバシーポリシーの改訂
          </h2>
          <p className="mt-2">
            本ポリシーは、必要に応じて予告なく改訂されることがあります。
            最新版は常に本ページに掲載されます。
          </p>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            8. お問い合わせ
          </h2>
          <p className="mt-2">
            本ポリシーに関するお問い合わせは、
            <Link href="/contact" className="text-orange-600 hover:underline">
              お問い合わせページ
            </Link>
            よりお願いいたします。
          </p>
        </div>
      </section>
    </main>
  );
}
