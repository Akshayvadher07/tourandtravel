import Image from "next/image";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  imageUrl: string;
};

export function PageHero({ eyebrow, title, subtitle, imageUrl }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200">
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt=""
          width={1920}
          className="page-hero-img object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#fff8ea]/85 via-[#f6f1e6]/70 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_70%_50%,transparent,rgba(246,241,230,0.75))]" />
      </div>
      <div className="page-hero-fade site-shell relative py-20 sm:py-28 lg:py-32">
        <p className="ph-line ph-1 text-sm font-semibold uppercase tracking-[0.2em] text-[#2e7dab] drop-shadow-md">
          {eyebrow}
        </p>
        <h1 className="ph-line ph-2 mt-4 max-w-3xl font-serif text-4xl font-medium leading-tight text-slate-900 drop-shadow-lg sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="ph-line ph-3 mt-6 max-w-2xl text-lg leading-relaxed text-slate-700 drop-shadow sm:text-xl">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
