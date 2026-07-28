export function FactoryGallery() {
  return (
    <section id="factory-view" className="py-16 max-w-7xl mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
        <span className="text-xs font-extrabold tracking-widest text-teal-600 uppercase">
          MANUFACTURING TRUST
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">國際認證潔淨生產線</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
          <img
            src="/mal1688/MAL_Calc_banner_v2.webp"
            alt="MAL 國際認證無塵生產線 ISO HACCP NSF SGS"
            className="w-full h-auto hover:scale-[1.003] transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
          <img
            src="/mal1688/mal-factory-clean.webp"
            alt="MAL 潔淨生產線實況"
            className="w-full h-auto hover:scale-[1.003] transition-transform duration-500"
            loading="lazy"
          />
        </div>
      </div>
      <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase block mt-3 text-center">
        專業製程管控 ． 高規格潔淨環境 ． 安心品質保證
      </span>
    </section>
  );
}
