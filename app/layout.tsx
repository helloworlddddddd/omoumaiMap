import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://omoumai-map.com";

export const viewport: Viewport = {
  themeColor: "#f97316",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "オモウマい店マップ",
    template: "%s|オモウマい店マップ",
  },
  description:
    "テレビ番組で紹介された飲食店を、都道府県・ジャンル・営業ステータスから地図と一覧で探せます。",
  openGraph: {
    siteName: "オモウマい店マップ",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
  },
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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3306040727752702"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <a href="#main-content" className="skip-link">
          メインコンテンツへスキップ
        </a>
        <div id="main-content">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
