import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSection } from "@/components/mal1688/HeroSection";
import { ImageBanner } from "@/components/mal1688/ImageBanner";
import { FactoryGallery } from "@/components/mal1688/FactoryGallery";

const exploreLinks = [
  { to: "/mal1688/story", icon: "💛", label: "暖心守護故事", desc: "品牌初衷與研發理念" },
  { to: "/mal1688/science", icon: "🧬", label: "黃金協同技術", desc: "三大高吸收技術支柱" },
  { to: "/mal1688/solutions", icon: "💎", label: "四重高效配方", desc: "三層錠劑結構解密" },
  { to: "/mal1688/lab", icon: "🧪", label: "成長灌溉實驗室", desc: "互動調節吸收模擬" },
  { to: "/mal1688/pricing", icon: "🛒", label: "線上特惠訂購", desc: "選擇適合的補鈣計畫" },
  { to: "/mal1688/academy", icon: "📘", label: "內部教育訓練沙盒", desc: "經銷夥伴合規指南" },
];

export const Route = createFileRoute("/mal1688/")({
  head: () => ({
    meta: [
      {
        name: "description",
        content:
          "MAL 活粒鈣：四重晶體複合鈣源，融合維生素 D3 與 K2，香濃牛奶風味咀嚼錠，為全家與兒童骨骼與牙齒發育提供高吸收、不脹氣的營養支持。",
      },
    ],
  }),
  component: Mal1688Home,
});

function Mal1688Home() {
  return (
    <>
      <HeroSection />

      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-extrabold tracking-widest text-teal-600 uppercase">
            EXPLORE MAL
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">深入認識活「粒」生活</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {exploreLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-300 transition-all flex flex-col gap-2"
            >
              <span className="text-2xl">{l.icon}</span>
              <span className="text-sm font-black text-slate-900">{l.label}</span>
              <span className="text-xs text-slate-500">{l.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      <ImageBanner src="/mal1688/MAL_Calc_banner_v1.webp" alt="MAL 成長鈣咀嚼錠電商官方 Banner" />
      <FactoryGallery />
    </>
  );
}
