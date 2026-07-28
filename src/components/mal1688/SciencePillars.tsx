import { Zap, Gem, GitMerge } from "lucide-react";

const pillars = [
  {
    icon: Zap,
    iconBg: "bg-amber-50 text-amber-500",
    tag: "PILLAR 01 · 基礎新陳代謝",
    tagColor: "text-amber-600",
    title: "科學協同促進代謝機制",
    desc: "單純補充單一高劑量原料，若缺乏健康的代謝環境支持，極易流失。活「粒」生活著重於體內營養素的協同效應，透過溫和的草本及海洋微量礦物質成分，幫助調整體質，維持健康充滿活力、神經肌肉生理正常的新陳代謝良性循環。",
  },
  {
    icon: Gem,
    iconBg: "bg-teal-50 text-teal-600",
    tag: "PILLAR 02 · 四重晶體複合鈣",
    tagColor: "text-teal-600",
    title: "溫和多元的鈣質網絡",
    desc: "拋棄容易引起脹氣不適的廉價碳酸鈣。完美融合：水解珍珠鈣微分子 + 愛爾蘭天然紅藻海藻鈣 + 原生態優質牛奶鈣 + 極致溫和好溶解的 L-乳酸鈣，全方位打造分層釋放曲線，細心呵護全家腸胃，有助於維持骨骼與牙齒的正常發育。",
  },
  {
    icon: GitMerge,
    iconBg: "bg-cyan-50 text-cyan-600",
    tag: "PILLAR 03 · 關鍵導航引導",
    tagColor: "text-cyan-600",
    title: "維生素 D3 × K2 閉環",
    desc: "配方特別添加植物源高活性維生素 D3，能有效增進鈣吸收，幫助骨骼與牙齒的生長發育；搭配珍貴納豆來源的高純度維生素 K2，活化特殊蛋白質，引導鈣質沉積，形成完善的健康維持閉環。",
  },
];

export function SciencePillars() {
  return (
    <section id="science" className="py-20 max-w-7xl mx-auto px-6 border-b border-slate-100">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <span className="text-xs font-extrabold tracking-widest text-teal-600 uppercase">
          HEALTHY FORMULA PILLARS
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
          黃金高吸收三柱 — 告別盲目低效補充
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {pillars.map((p) => (
          <div
            key={p.title}
            className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${p.iconBg}`}
              >
                <p.icon className="w-6 h-6" />
              </div>
              <span className={`text-xs font-bold block mb-2 uppercase ${p.tagColor}`}>
                {p.tag}
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{p.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
