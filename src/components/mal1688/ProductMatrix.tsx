import { ShieldCheck } from "lucide-react";

export function ProductMatrix() {
  return (
    <section id="solutions" className="py-20 max-w-7xl mx-auto px-6 border-b border-slate-100">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <span className="text-xs font-extrabold tracking-widest text-teal-600 uppercase">
          PRODUCT MATRIX
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
          MAL 活粒鈣 四重晶體頂級複合配方
        </h2>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-center bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-md">
        <div className="lg:col-span-5 space-y-6">
          <span className="text-xs text-teal-600 font-bold block uppercase">全方位高吸收網絡</span>
          <h3 className="text-2xl font-black text-slate-900">「四大高端鈣源」與多層釋放工藝</h3>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            告別單一鈣源釋放不均的弊端，透過先進包埋工藝與三層錠劑結構設計，實現完美的多層級、多梯隊緩釋溶解吸收效率：
          </p>

          <div className="space-y-3 text-xs font-medium text-slate-600">
            <p className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                <strong>速釋層 (外層)：</strong>
                促進初期溶解與有效成分釋放，兼顧濃郁純粹的牛奶糖風味依從性。
              </span>
            </p>
            <p className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>
                <strong>主藥層 (中層)：</strong>
                包埋天然海藻鈣與原生態牛奶鈣核心精華，提供長期穩定釋放曲線。
              </span>
            </p>
            <p className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
              <span>
                <strong>口感層 (內層)：</strong>
                極致微分子水解珍珠鈣配比，改善風味並全面杜絕傳統粉沙感負擔。
              </span>
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="w-full bg-white rounded-3xl border border-slate-200 p-3 shadow-xl overflow-hidden">
            <img
              src="/mal1688/malcalcp3.webp"
              alt="MAL 活粒鈣咀嚼錠三層結構與人體吸收解離流程科學圖解"
              className="w-full h-auto rounded-2xl hover:scale-[1.005] transition-transform duration-500"
              loading="lazy"
            />
          </div>
          <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-3">
            P3 視覺展示 ． 裸錠分層工藝與五步吸收通路閉環圖解已整合
          </span>
        </div>
      </div>
    </section>
  );
}
