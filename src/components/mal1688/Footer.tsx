export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200/80 py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <span className="text-lg font-black text-slate-900">MitoActiveLife</span>
          <p className="text-xs text-slate-500 leading-relaxed font-bold">
            MitoActiveLife 活「粒」生活 專業與健康維持系列。融合多元優質複合鈣源 × 關鍵導航因子 ×
            100% 牛奶依從性。2026年修訂版。
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-slate-400 font-extrabold mb-4">
            合法合規聲明與標準詞句
          </h4>
          <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
            本網頁所有產品文案、教育訓練沙盒之編寫與規劃，均嚴格遵循衛生福利部食品藥物管理署公告之「食品廣告標示詞句認定基準」，僅作營養補充與健康維持之用途宣傳，不涉及任何醫療、疾病預防、突破基因與不實誇大之詞彙。
          </p>
        </div>
        <div>
          <span className="text-xs text-slate-400 font-bold block">
            © 2026 MitoActiveLife Inc. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
