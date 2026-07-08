import type { ShopExtended } from "@/types/shop";
import type { ShopStatus } from "@/types/shop";

type Props = Pick<
  ShopExtended,
  "businessHours" | "closedDays" | "phoneNumber" | "crowdedTime" | "additionalInfo" | "infoAsOf"
> & { status: ShopStatus };

export function BusinessInfoSection({
  businessHours,
  closedDays,
  phoneNumber,
  crowdedTime,
  additionalInfo,
  infoAsOf,
  status,
}: Props) {
  const hasBasic = businessHours || closedDays || phoneNumber || crowdedTime;
  const hasAdditional = additionalInfo && additionalInfo.length > 0;
  if (!hasBasic && !hasAdditional) return null;

  const rows: { label: string; value: string }[] = [];
  if (businessHours) rows.push({ label: "営業時間", value: businessHours });
  if (closedDays) rows.push({ label: "定休日", value: closedDays });
  if (phoneNumber) rows.push({ label: "電話番号", value: phoneNumber });
  if (crowdedTime) rows.push({ label: "混雑時間帯", value: crowdedTime });
  if (additionalInfo) {
    for (const item of additionalInfo) {
      rows.push({ label: item.label, value: item.value });
    }
  }

  return (
    <section className="bg-white rounded-lg border border-orange-100 shadow-sm p-4 md:p-5">
      <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-1.5">
        <span aria-hidden>🕐</span>営業情報
        {infoAsOf && (
          <span className="ml-auto text-xs text-gray-400 font-normal">
            {infoAsOf}時点
          </span>
        )}
      </h2>

      <dl className="flex flex-col gap-2">
        {rows.map((row) => (
          <div key={row.label} className="flex gap-3 text-sm">
            <dt className="shrink-0 w-24 text-gray-500">{row.label}</dt>
            <dd className="text-gray-800">{row.value}</dd>
          </div>
        ))}
      </dl>

      {status === "closed" && (
        <p className="mt-3 text-xs text-red-500 font-medium flex items-center gap-1">
          <span aria-hidden>⚠️</span>現在は閉店しています
        </p>
      )}
    </section>
  );
}
