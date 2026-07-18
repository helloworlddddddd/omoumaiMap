import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-orange-100 bg-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-6 md:py-10 flex flex-col gap-6 text-sm">
        <nav aria-label="サイト情報" className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/" className="text-gray-700 hover:text-orange-600">
            トップ
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-orange-600">
            運営者情報
          </Link>
          <Link
            href="/privacy"
            className="text-gray-700 hover:text-orange-600"
          >
            プライバシーポリシー
          </Link>
          <Link
            href="/disclaimer"
            className="text-gray-700 hover:text-orange-600"
          >
            免責事項
          </Link>
          <Link
            href="/contact"
            className="text-gray-700 hover:text-orange-600"
          >
            お問い合わせ
          </Link>
        </nav>

        <p className="text-xs text-gray-500 leading-relaxed">
          本サイトはテレビ番組の視聴者が個人で運営している非公式のファンサイトです。
          番組の制作会社・放送局・出演者とは一切関係がありません。
        </p>

        <p className="text-xs text-gray-500">
          © {year} オモウマい店Map（非公式）
        </p>
      </div>
    </footer>
  );
}
