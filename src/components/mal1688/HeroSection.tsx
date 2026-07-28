import { Heart } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden border-b border-slate-100 bg-gradient-to-b from-white to-[#fdfbf7]">
      <div className="absolute top-1/4 left-1/2 mal1688-glow-warm w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-xs text-teal-700 font-bold tracking-wide">
              <Heart className="w-3.5 h-3.5 text-teal-600" />
              <span>專為全家與兒童骨骼與牙齒發育研發 ． 暖心守護</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl font-black tracking-tight leading-tight text-slate-900">
              補鈣，吸收重於含量！
              <br />
              <span className="bg-gradient-to-r from-teal-700 via-teal-600 to-amber-600 bg-clip-text text-transparent">
                給全家人好吃好吸收的營養維持
              </span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed font-medium">
              打破傳統補充品厚重、難吞嚥的刻板印象！<strong>MAL 活粒鈣</strong>
              精選大西洋無污染天然紅藻海藻鈣，搭配原生態牛奶鈣，打造優質四重營養網絡。融入維生素 D3
              與 K2
              增進鈣吸收，化為香濃純粹的牛奶風味營養咀嚼錠，讓日常補充成為全家人主動期待的快樂時光。
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#pricing"
                className="px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-600/20 hover:scale-[1.02] transition-all flex items-center gap-2"
              >
                查看專屬補鈣計畫
              </a>
              <a
                href="#solutions"
                className="px-6 py-3 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 transition-all flex items-center gap-2 shadow-sm"
              >
                四重技術解密
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-[480px] bg-white rounded-3xl border border-slate-200 p-4 shadow-xl overflow-hidden">
              <img
                src="/mal1688/malcalcp1.webp"
                alt="MAL 成長鈣咀嚼錠實體包裝"
                className="w-full h-auto rounded-2xl hover:scale-[1.01] transition-transform duration-300"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
