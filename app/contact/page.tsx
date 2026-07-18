import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "オモウマい店Map（非公式）へのお問い合わせ。X（旧Twitter）のダイレクトメッセージにて受け付けています。",
  alternates: {
    canonical: "/contact/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const X_HANDLE = "omoumai38";
const X_DM_URL = `https://x.com/messages/compose?recipient_id=${X_HANDLE}`;
const X_PROFILE_URL = `https://x.com/${X_HANDLE}`;

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 md:px-6 md:py-12">
      <nav className="text-xs text-gray-500 flex flex-wrap gap-1.5">
        <Link href="/" className="hover:text-orange-600">
          トップ
        </Link>
        <span aria-hidden>/</span>
        <span className="text-gray-700">お問い合わせ</span>
      </nav>

      <h1 className="mt-4 text-2xl md:text-3xl font-bold text-gray-900">
        お問い合わせ
      </h1>

      <section className="mt-8 flex flex-col gap-6 text-sm md:text-base text-gray-800 leading-relaxed">
        <div>
          <p>
            オモウマい店Map（非公式）へのお問い合わせは、
            <strong>X（旧Twitter）のダイレクトメッセージ</strong>にて受け付けています。
          </p>
        </div>

        <div className="rounded-lg border border-orange-200 bg-orange-50/50 p-4 md:p-6">
          <div className="text-sm text-gray-600">公式アカウント</div>
          <div className="mt-1 text-lg md:text-xl font-bold text-gray-900">
            @{X_HANDLE}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={X_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-gray-900 text-white h-10 px-5 text-sm font-medium hover:bg-gray-800"
            >
              Xでプロフィールを見る
            </a>
            <a
              href={X_DM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-orange-500 text-white h-10 px-5 text-sm font-medium hover:bg-orange-600"
            >
              DMを送る →
            </a>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            DMボタンからうまく遷移しない場合は、プロフィールを開いて手動でDMを送信してください。
          </p>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            お問い合わせ内容の例
          </h2>
          <ul className="mt-2 pl-5 list-disc flex flex-col gap-1">
            <li>掲載店舗の情報の修正・訂正依頼</li>
            <li>閉業情報の報告</li>
            <li>掲載店舗の関係者からの掲載内容についてのご相談</li>
            <li>本サイトに関するご意見・ご感想</li>
            <li>その他、運営に関するご連絡</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            返信について
          </h2>
          <p className="mt-2">
            個人で運営しているため、返信までにお時間をいただく場合があります。
            内容によってはお返事を差し上げられない場合もあること、
            あらかじめご了承ください。
          </p>
        </div>

        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            掲載店舗の予約・注文について
          </h2>
          <p className="mt-2">
            本サイトは掲載店舗と直接の関係はありません。
            店舗への予約・注文・営業内容に関するお問い合わせは、必ず店舗の公式連絡先へ
            直接ご連絡ください。運営側で取次は行っておりません。
          </p>
        </div>
      </section>
    </main>
  );
}
