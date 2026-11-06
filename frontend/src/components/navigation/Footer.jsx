function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold">
              Sport <span className="text-secondary">Jersey</span>
            </h2>

            <p className="text-sm text-slate-300 mt-2 max-w-sm leading-relaxed">
              Temukan jersey favoritmu dengan pilihan produk berkualitas untuk
              mendukung tim kesayanganmu.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-3">Navigasi</h3>

            <div className="flex flex-col gap-2 text-sm text-slate-300">
              <a href="/" className="hover:text-secondary transition">
                Home
              </a>

              <a href="/products" className="hover:text-secondary transition">
                Produk
              </a>

              <a href="/cart" className="hover:text-secondary transition">
                Keranjang
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-600 mt-8 pt-5 text-center">
          <p className="text-xs text-slate-400">
            © 2026 Sport Jersey. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
