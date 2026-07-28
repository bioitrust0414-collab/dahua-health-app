import { useEffect, useState } from "react";
import { Sliders } from "lucide-react";

export function LabSimulator() {
  const [nutritionSynergy, setNutritionSynergy] = useState(60);
  const [quadCalcium, setQuadCalcium] = useState(50);
  const [vitD3K2, setVitD3K2] = useState(50);
  const [flavorAcceptance, setFlavorAcceptance] = useState(true);

  const [absorptionRate, setAbsorptionRate] = useState(50);
  const [boneDensityRate, setBoneDensityRate] = useState(50);
  const [comfortRatio, setComfortRatio] = useState(90);

  useEffect(() => {
    const isSynergyIgnited = nutritionSynergy > 45;
    const rawAbsorb = quadCalcium * 0.5 + vitD3K2 * 0.5;
    const finalAbsorb = isSynergyIgnited ? Math.min(95, rawAbsorb * 1.2 + 10) : rawAbsorb * 0.6;
    setAbsorptionRate(Math.round(finalAbsorb));

    const finalBone = Math.round(finalAbsorb * 0.7 + vitD3K2 * 0.3 + (flavorAcceptance ? 5 : 0));
    setBoneDensityRate(Math.min(100, finalBone));

    let baseComfort = 70;
    baseComfort += (quadCalcium / 100) * 20 + (flavorAcceptance ? 10 : 0);
    setComfortRatio(Math.min(100, baseComfort));
  }, [nutritionSynergy, quadCalcium, vitD3K2, flavorAcceptance]);

  return (
    <section id="lab" className="py-20 bg-[#fdfbf7] relative border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-xs font-bold text-teal-600 inline-block">
            NUTRITION SIMULATOR
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            MAL 活粒鈣 成長灌溉實驗室
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-medium">
            即時調節核心技術因子，體驗「四重優質鈣源 ➔ 維生素 D3/K2 雙導航 ➔
            孩子天天主動足量補充」的良性健康循環。
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-md">
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <Sliders className="w-5 h-5 text-teal-600" />
              <h3 className="text-lg font-bold text-slate-800">調節技術因子與服用依從性</h3>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-700">基礎配方協同代謝環境</span>
                <span className="font-bold text-amber-600">{nutritionSynergy}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={nutritionSynergy}
                onChange={(e) => setNutritionSynergy(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-200 rounded-lg appearance-none h-2 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-700">四重複合鈣源配比</span>
                <span className="font-bold text-teal-600">{quadCalcium}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={quadCalcium}
                onChange={(e) => setQuadCalcium(Number(e.target.value))}
                className="w-full accent-teal-600 bg-slate-200 rounded-lg appearance-none h-2 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-700">維生素 D3 × K2 導航配比</span>
                <span className="font-bold text-cyan-600">{vitD3K2}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={vitD3K2}
                onChange={(e) => setVitD3K2(Number(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-200 rounded-lg appearance-none h-2 cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between shadow-sm">
              <div className="space-y-1">
                <span className="font-bold text-sm text-slate-800 block">
                  香濃牛奶風味 (提高服用依從性)
                </span>
                <p className="text-xs text-slate-500">像牛奶糖般濃郁美味，孩子主動討著吃</p>
              </div>
              <button
                onClick={() => setFlavorAcceptance(!flavorAcceptance)}
                className={`w-14 h-8 rounded-full transition-colors relative flex items-center px-1 ${
                  flavorAcceptance ? "bg-teal-600" : "bg-slate-300"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white transition-transform shadow-md ${
                    flavorAcceptance ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center min-h-[350px] shadow-sm relative overflow-hidden">
            <span className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-4 z-10">
              全家人健康支持動態模擬
            </span>
            <div className="relative w-48 h-32 flex items-end justify-center gap-2 z-10">
              <div
                className="w-8 bg-teal-500 rounded-t-full transition-all duration-300"
                style={{ height: `${40 + boneDensityRate / 2}%` }}
              />
              <div
                className="w-6 bg-amber-400 rounded-t-full transition-all duration-300"
                style={{ height: `${20 + boneDensityRate / 3}%` }}
              />
              <div
                className="w-7 bg-cyan-500 rounded-t-full transition-all duration-300"
                style={{ height: `${35 + boneDensityRate / 2.2}%` }}
              />
            </div>
            <div className="text-center text-xs font-bold text-slate-700 mt-6 z-10 px-4">
              分時高吸收：一錠125mg鈣含量 ． 一天4錠完美補充
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col justify-between gap-6">
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-500 block font-bold">黃金高吸收利用效率</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-black text-slate-800">{absorptionRate}</span>
                  <span className="text-xs text-teal-600 font-extrabold">%</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-500 block font-bold">
                  骨骼與牙齒正常發育支持率
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-black text-slate-800">{boneDensityRate}</span>
                  <span className="text-xs text-cyan-600 font-extrabold">%</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-500 block font-bold">
                  消化道溫和舒適感 (不脹氣)
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-black text-slate-800">{comfortRatio}</span>
                  <span className="text-xs text-teal-600 font-extrabold">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
