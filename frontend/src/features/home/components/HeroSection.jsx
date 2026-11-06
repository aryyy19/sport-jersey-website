function HeroSection() {
  return (
    <section className="bg-primary rounded-2xl overflow-hidden">
      <div className="px-8 py-12 md:px-12 md:py-16">
        <div className="max-w-2xl">
          <span className="inline-block bg-white/10 text-secondary text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            SPORT JERSEY COLLECTION
          </span>

          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Temukan Jersey Favoritmu!
          </h1>

          <p className="text-slate-300 mt-4 leading-relaxed max-w-lg">
            Dukung tim kesayanganmu dengan koleksi jersey pilihan yang nyaman
            dan berkualitas.
          </p>

          <a
            href="#products"
            className="inline-block mt-7 bg-secondary text-primary font-semibold text-sm px-6 py-3 rounded-lg hover:bg-yellow-400 transition"
          >
            Lihat Produk
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
