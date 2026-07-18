import Link from "next/link";

export function AboutFaqSection({ shopCount }: { shopCount: number }) {
  return (
    <section className="bg-white border-t border-orange-100">
      <div className="mx-auto w-full max-w-3xl px-4 py-10 md:px-6 md:py-14 flex flex-col gap-10">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            このサイトについて
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-700 leading-relaxed">
            「オモウマい店Map（非公式）」は、テレビ番組で紹介された全国の飲食店を、
            地図と一覧で探せるようにまとめた非公式ファンサイトです。
            現在 {shopCount} 店舗を掲載しています。
          </p>
          <p className="mt-2 text-sm md:text-base text-gray-700 leading-relaxed">
            番組を観て「あの店、どこにあるんだっけ？」「旅行のついでに寄ってみたい」
            と思ったときに、店名・住所・営業ステータス・地図・アクセスまで
            まとめて確認できることを目指しています。
          </p>
        </div>

        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            よくある質問
          </h2>

          <div className="mt-4 flex flex-col gap-5">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Q. このサイトはテレビ番組と関係がありますか？
              </h3>
              <p className="mt-1 text-sm md:text-base text-gray-700 leading-relaxed">
                いいえ。番組の視聴者が個人で運営している非公式のマップです。
                番組の制作会社・放送局・出演者とは一切関係がなく、公式に承認されたサイトではありません。
                番組名や店舗名は事実の記述としてのみ使用しています。
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Q. 掲載している情報の出典はどこですか？
              </h3>
              <p className="mt-1 text-sm md:text-base text-gray-700 leading-relaxed">
                店名・住所・放送日といった基本情報は、テレビ番組内で紹介された内容と
                Google マップ（Google Places）に掲載されている公開情報を参照しています。
                これら以外の第三者サイトからの転載は行っていません。
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Q. 営業時間や定休日、営業ステータスは最新ですか？
              </h3>
              <p className="mt-1 text-sm md:text-base text-gray-700 leading-relaxed">
                営業情報は Google マップ（Google Places）のデータに準拠しています。
                個別店舗の営業時間・定休日・営業中／閉業などのステータスは、
                訪問前に必ず店舗の公式情報や Google マップ上の最新表示をご確認ください。
                本サイトの情報の正確性・最新性については保証していません。
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Q. どうやって行きたい店を探せばいいですか？
              </h3>
              <p className="mt-1 text-sm md:text-base text-gray-700 leading-relaxed">
                いくつか方法があります。
              </p>
              <ul className="mt-2 pl-5 list-disc text-sm md:text-base text-gray-700 leading-relaxed flex flex-col gap-1">
                <li>
                  ページ上部の<strong>地図</strong>から、行きたいエリアを直接ズーム・スクロールして探す
                </li>
                <li>
                  検索ボックスに<strong>店名</strong>・<strong>市区町村名</strong>を入力する
                </li>
                <li>
                  <strong>都道府県フィルター</strong>で地域を絞り込む
                </li>
                <li>
                  <Link href="/tokyo" className="text-orange-600 hover:underline">
                    東京
                  </Link>
                  や
                  <Link href="/osaka" className="text-orange-600 hover:underline">
                    大阪
                  </Link>
                  など、都道府県別ページから一覧で見る
                </li>
                <li>
                  スマートフォンからは<strong>現在地ボタン</strong>で、近くのお店をすぐ確認できます
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
