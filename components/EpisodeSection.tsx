import type { ShopExtended } from "@/types/shop";

export function EpisodeSection({
  extended,
}: {
  extended: Pick<ShopExtended, "episodeSummary" | "episodeHighlights">;
}) {
  const { episodeSummary, episodeHighlights } = extended;
  if (!episodeSummary && !episodeHighlights?.length) return null;

  return (
    <section className="bg-white rounded-lg border border-orange-100 shadow-sm p-4 md:p-5">
      <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-1.5">
        <span aria-hidden>📺</span>番組で紹介された内容
      </h2>

      {episodeSummary && (
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {episodeSummary}
        </p>
      )}

      {episodeHighlights && episodeHighlights.length > 0 && (
        <div className="mt-3">
          <p className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1">
            <span aria-hidden>📌</span>印象的なシーン
          </p>
          <ul className="flex flex-col gap-1">
            {episodeHighlights.map((h, i) => (
              <li key={i} className="text-sm text-gray-700 flex gap-2">
                <span className="text-orange-400 shrink-0">・</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
