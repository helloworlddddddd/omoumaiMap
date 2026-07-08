const LINK_DEFS = [
  {
    icon: "📸",
    label: "Googleで写真・口コミを見る",
    href: (name: string) =>
      `https://www.google.com/search?q=${encodeURIComponent(name)}&tbm=isch`,
  },
  {
    icon: "🐦",
    label: "Xでみんなの投稿を見る",
    href: (name: string) =>
      `https://x.com/search?q=${encodeURIComponent(name + " オモウマ")}&f=live`,
  },
  {
    icon: "🎬",
    label: "YouTubeで動画を探す",
    href: (name: string) =>
      `https://www.youtube.com/results?search_query=${encodeURIComponent(name + " オモウマい店")}`,
  },
  {
    icon: "🍴",
    label: "食べログで詳細を見る",
    href: (name: string) =>
      `https://tabelog.com/rst/search/RstSearchResult/?sw=${encodeURIComponent(name)}`,
  },
];

export function ExternalLinksSection({ shopName }: { shopName: string }) {
  return (
    <section className="bg-white rounded-lg border border-orange-100 shadow-sm p-4 md:p-5">
      <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-1.5">
        <span aria-hidden>🔍</span>もっと詳しく調べる
      </h2>

      <ul className="flex flex-col gap-2">
        {LINK_DEFS.map((def) => (
          <li key={def.label}>
            <a
              href={def.href(shopName)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 hover:underline"
            >
              <span aria-hidden className="text-base">{def.icon}</span>
              {def.label}
              <span aria-hidden className="text-gray-400 text-xs ml-auto">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
