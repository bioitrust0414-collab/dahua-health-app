import { Smile } from "lucide-react";

export function StorySection() {
  return (
    <section id="story" className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-extrabold tracking-widest text-teal-600 uppercase">
            OUR BRAND STORY
          </span>
          <h2 className="text-3xl font-black text-slate-900">微小的日常，值得滿分的支撐</h2>
          <p className="text-slate-500 text-xs sm:text-sm">懂科學的嚴謹，更懂媽媽毫隨保留的在乎</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full h-[400px] bg-gradient-to-br from-[#fdfbf7] to-amber-50/50 border border-slate-200 rounded-3xl flex flex-col items-center justify-center p-6 text-center relative overflow-hidden shadow-inner">
              <div className="absolute inset-4 border border-dashed border-slate-300/60 rounded-2xl flex flex-col items-center justify-center p-4">
                <Smile className="w-12 h-12 text-amber-500 mb-3" />
                <h4 className="text-sm font-black text-slate-700">親子成長溫馨形象圖欄位</h4>
                <p className="text-xs text-slate-400 mt-2 max-w-[240px] leading-relaxed">
                  建議置入：媽媽測量身高或手牽手插畫。尺寸：800 × 1000 px 直式矩形圖
                </p>
              </div>
            </div>
            <span className="text-[10px] text-slate-400 font-bold tracking-widest mt-2 uppercase">
              P2 視覺展示 ． 建議尺寸：800 × 1000 像素
            </span>
          </div>

          <div className="lg:col-span-7 space-y-5 text-slate-600 text-sm leading-relaxed font-medium">
            <h3 className="text-xl font-black text-slate-900 border-l-4 border-teal-500 pl-3">
              【MitoActiveLife 活「粒」生活】品牌故事
            </h3>
            <p>
              我們總以為，健康是一場遠大的追求。直到某天發現：看著孩子在關鍵發育期因為成長的酸痛在夜裡翻身，或者看著家裡長輩步履不再像以前那樣輕盈。這才明白，支撐起生活的，不是驚天動地的大事，而是每一個能穩穩站立、大步向前、緊緊擁抱家人的日常。
            </p>
            <p>
              看著孩子因為傳統化學碳酸鈣太大顆、吞嚥困難，甚至容易引起肚子脹氣而不願補充；聽著他們因怪異藥味而抗拒逃避。我們開始思考：健康不應該是一種負擔，補鈣，能不能變成一件讓全家人都期待的香濃時光？
            </p>
            <p>
              於是，<strong>MAL 活粒鈣</strong>
              選擇回歸純淨初衷。不計成本打造「四重晶體高效複合系統」，完美融合無污染海藻鈣、極致水解珍珠鈣、原生态牛奶鈣與好溶解的
              L-乳酸鈣。堅持 100% CLEAN LABEL
              潔淨製程，摒棄繁複人工香料，揉合天然乳源調配出濃郁純粹的牛奶風味。
            </p>
            <p className="font-bold text-teal-700 bg-teal-50 p-3 rounded-xl border border-teal-100">
              ✨
              一咬即碎、隨後化開，沒有吞嚥的恐懼，只有像吃牛奶糖般的幸福感。用科學的嚴謹，裝填媽媽毫無保留的在乎，有助於維持骨骼與牙齒的正常發育與健康維持。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
