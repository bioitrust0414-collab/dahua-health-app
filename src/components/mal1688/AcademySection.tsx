import { useState } from "react";
import { BookOpen } from "lucide-react";

const tabs = [
  { id: "manifesto", label: "核心配方理念" },
  { id: "emotions", label: "分齡與長輩保養" },
  { id: "objections", label: "合規對答與心理拆招" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const objections = [
  {
    id: "o1",
    client: "「一盒 900 元可以吃多久？如何吃效率最好？」",
    response:
      "「MAL 活粒鈣一盒內含 60 錠防潮 PTP 片裝。針對需要高效率補充的關鍵時期，我們建議每日 4 錠（早晚各 2 錠），一盒為足量 15 天份。人體腸道對鈣質的單次吸收上限約為 500mg，分次、分時補充 125mg 的純鈣，能讓腸道維持在最高吸收效率，避免單次高劑量帶來的浪費與腸胃負擔，是最高效、最精準的健康投資。」",
  },
  {
    id: "o2",
    client: "「市售碳酸鈣更便宜，差別在哪裡？」",
    response:
      "正式物理結構不同。「市售碳酸鈣遇到胃酸容易釋放大量二氧化碳氣體，導致肚子脹氣、便秘。我們融合海藻鈣、牛奶鈣等四大純淨高端鈣源，溫和不傷消化道。極高的服用依從性與高吸收率，才是最省心的選擇！」",
  },
  {
    id: "o3",
    client: "「孩子很挑食，怕買了又不吃」",
    response:
      "「活『粒』生活採用 100% CLEAN LABEL 潔淨製程，完美揉合天然乳源，調配出濃郁溫潤的牛奶風味。一咬即碎、隨後化開，像吃牛奶糖般的幸福感，孩子會天天主動搶著吃，不需媽媽操心！」",
  },
];

export function AcademySection() {
  const [activeTab, setActiveTab] = useState<TabId>("manifesto");
  const [flippedObjection, setFlippedObjection] = useState<string | null>(null);

  return (
    <section id="academy" className="py-20 max-w-7xl mx-auto px-6 border-b border-slate-100">
      <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between gap-6 mb-12">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-xs text-teal-600 font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>MAL 活粒鈣 經銷夥伴合規教育訓練指南</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">常見問題與服務對答拆招</h2>
          <p className="text-slate-600 text-xs sm:text-sm font-medium">
            本章節供服務人員與經銷通路內部教育訓練使用。請嚴格遵循衛福部核可之營養宣傳口徑與客戶溝通。
          </p>
        </div>

        <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === t.id ? "bg-teal-600 text-white shadow-sm" : "text-slate-600"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg">
        {activeTab === "manifesto" && (
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-slate-900">
              「美味與吸收並重，讓日常補充成為期待」
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              吃得再多，沒吸收也是徒勞。活「粒」生活秉持專業生技研發原則，將維生素 D3、維生素 K2
              與多元複合鈣源融為一體，以優質的黃金高吸收配方，全面有助於維持骨骼與牙齒的正常發育與健康。
            </p>
          </div>
        )}

        {activeTab === "emotions" && (
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-4 space-y-3">
              <span className="text-xs text-cyan-600 font-bold uppercase block mb-4">
                精準分齡劑量與日常規劃指引
              </span>
              <div className="p-4 bg-white border border-slate-200 rounded-xl">
                <span className="text-xs font-bold text-slate-800 block">
                  👶 兒童關鍵成長期 —— 每日建議 4 粒 (提供500mg純鈣)
                </span>
                <p className="text-xs text-slate-500 mt-1">
                  分次隨餐咀嚼。完美填補日常膳食不足，補給骨骼與牙齒成長所需關鍵營養。
                </p>
              </div>
              <div className="p-4 bg-white border border-slate-200 rounded-xl">
                <span className="text-xs font-bold text-slate-800 block">
                  🧓 銀髮長輩與熟齡保養 —— 每日建議 4 粒
                </span>
                <p className="text-xs text-slate-500 mt-1">
                  隨餐服用。有助於維持骨骼健康與維持靈活動力，常保肌肉與神經的正常收縮。
                </p>
              </div>
            </div>

            <div className="md:col-span-8 bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs text-teal-700 font-black block uppercase">
                  TFDA 衛福部公告之規範宣稱標準詞句：
                </span>
                <ul className="list-disc pl-5 text-xs text-slate-700 space-y-2 font-medium">
                  <li>
                    <strong>鈣：</strong>{" "}
                    有助於維持骨骼與牙齒的正常發育與健康。幫助血液正常的凝固功能。常與肌肉與神經的正常收縮及皮膚的健康。
                  </li>
                  <li>
                    <strong>維生素D：</strong>{" "}
                    增進鈣吸收。幫助骨骼與牙齒的生長發育。促進釋放骨鈣，以維持血鈣平衡。有助於維持神經、肌肉的正常生理。
                  </li>
                  <li>
                    <strong>維生素K：</strong>{" "}
                    有助血液正常的凝固功能。活化特殊蛋白質，將鈣質導向正確位置沉積。
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "objections" && (
          <div className="space-y-6">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
              <strong className="text-slate-800 block text-sm mb-1">💰 經銷夥伴合規安全紅線</strong>
              本產品每盒定價 900
              元（60錠/15天份）。在與媽媽面談拆招時，請務必強調「人體單次吸收上限限制、分時高吸收率、100%不脹氣、高服用依從性」的長期健康價值，
              <strong>切勿向消費者承諾任何暗示長高公分數、突破基因限制之誇大療效詞彙</strong>。
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {objections.map((obj) => (
                <div
                  key={obj.id}
                  onClick={() => setFlippedObjection(flippedObjection === obj.id ? null : obj.id)}
                  className="p-6 rounded-2xl border bg-white border-slate-200 hover:border-slate-300 cursor-pointer min-h-[160px] flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block mb-1">
                      提問拆招
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 mb-2 leading-snug">
                      {obj.client}
                    </h4>
                  </div>
                  {flippedObjection === obj.id ? (
                    <div className="text-[11px] pt-2 border-t border-teal-200 text-slate-700 leading-relaxed">
                      <strong>合規回覆：</strong>
                      {obj.response}
                    </div>
                  ) : (
                    <span className="text-[11px] text-amber-600 font-bold flex items-center gap-1">
                      👉 點擊查看內部對答法
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
