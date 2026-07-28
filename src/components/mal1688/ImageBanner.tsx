interface ImageBannerProps {
  id?: string;
  src: string;
  alt: string;
  caption?: string;
}

export function ImageBanner({ id, src, alt, caption }: ImageBannerProps) {
  return (
    <section id={id} className="py-16 max-w-7xl mx-auto px-6 text-center">
      <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto hover:scale-[1.003] transition-transform duration-500"
          loading="lazy"
        />
      </div>
      {caption ? (
        <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase block mt-3">
          {caption}
        </span>
      ) : null}
    </section>
  );
}
