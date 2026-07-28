import { Check } from "lucide-react";

const plans = [
  {
    name: "15天 基礎體驗組",
    sub: "適合首次嘗鮮、注重口感的挑食寶貝",
    qty: "1 盒",
    price: "NT$ 900",
    note: "平均 $60 / 天",
    features: ["MAL 活粒鈣 60錠/盒", "PTP 防潮獨立片裝 (6片入)", "100% 香濃牛奶風味口感體驗"],
    cta: "立即體驗",
    highlight: false,
  },
  {
    name: "30天 滿分成長組",
    sub: "黃金習慣養成，全家人同步保養",
    qty: "2 盒",
    price: "NT$ 1,680",
    original: "原價 $1,800",
    save: "省 $120",
    features: ["MAL 活粒鈣 60錠/盒 × 2", "滿足一個月每日足量黃金吸收期", "全台免運費優惠"],
    cta: "開啟滿分成長計畫",
    highlight: true,
  },
  {
    name: "60天 跨世代穩固組",
    sub: "滿足孩子發育與長輩骨質保養外溢",
    qty: "4 盒",
    price: "NT$ 3,160",
    original: "原價 $3,600",
    save: "省 $440",
    features: [
      "MAL 活粒鈣 60錠/盒 × 4",
      "適合全家大小、銀髮長輩共同保養",
      "免運費 + 贈獨家可愛身高紀錄表",
    ],
    cta: "全家常備購買",
    highlight: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-12 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-xs font-bold text-amber-700 inline-block">
            EXCLUSIVE OFFER
          </span>
          <h2 className="text-3xl font-black text-slate-900">選擇最適合家人的足量補鈣計畫</h2>
          <p className="text-slate-500 text-sm">
            每天 4 錠分時補給，高效填補營養缺口，陪伴孩子穩健成長發育。
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <img
            src="/mal1688/mal-3d-box.webp"
            alt="MAL 成長鈣咀嚼片 立體包裝"
            className="h-48 sm:h-56 w-auto"
            loading="lazy"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={
                plan.highlight
                  ? "bg-white rounded-3xl border-2 border-teal-500 p-8 flex flex-col justify-between shadow-md relative overflow-hidden ring-4 ring-teal-500/5"
                  : "bg-[#fdfbf7] rounded-3xl border border-slate-200 p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              }
            >
              {plan.highlight && (
                <div className="absolute top-0 right-0 bg-teal-500 text-white text-[10px] font-black px-4 py-1.5 rounded-bl-xl tracking-wider uppercase">
                  ★ 媽媽最愛首選
                </div>
              )}

              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-black text-slate-800">{plan.name}</h3>
                    <p
                      className={`text-xs mt-1 ${plan.highlight ? "text-teal-600 font-bold" : "text-slate-400"}`}
                    >
                      {plan.sub}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                      plan.highlight
                        ? "bg-teal-50 text-teal-700 border-teal-200"
                        : "bg-white text-slate-600 border-slate-200"
                    }`}
                  >
                    {plan.qty}
                  </span>
                </div>

                <div
                  className={`flex items-baseline gap-2 pb-6 border-b ${
                    plan.highlight ? "border-slate-100" : "border-slate-200/60"
                  }`}
                >
                  <span
                    className={
                      plan.highlight
                        ? "text-3xl font-black text-slate-900"
                        : "text-2xl font-black text-slate-800"
                    }
                  >
                    {plan.price}
                  </span>
                  {plan.original && (
                    <span className="text-xs text-slate-400 line-through">{plan.original}</span>
                  )}
                  {plan.save && (
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                      {plan.save}
                    </span>
                  )}
                  {plan.note && <span className="text-xs text-slate-400">{plan.note}</span>}
                </div>

                <ul className="space-y-3 text-xs text-slate-600 font-medium">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-teal-600" /> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={
                  plan.highlight
                    ? "w-full py-4 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 text-white text-xs font-bold shadow-lg shadow-teal-600/20 hover:scale-[1.01] transition-all mt-8"
                    : "w-full py-3.5 rounded-xl border border-slate-200 bg-white hover:border-teal-600 hover:bg-teal-50 text-slate-800 text-xs font-bold transition-colors mt-8"
                }
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
