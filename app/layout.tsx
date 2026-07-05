import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "オモウマい店マップ",
    template: "%s|オモウマい店マップ",
  },
  description:
    "テレビ番組で紹介された飲食店を、都道府県・ジャンル・営業ステータスから地図と一覧で探せます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJp.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-orange-50/40 text-gray-900">
        {children}
      </body>
    </html>
  );
}
