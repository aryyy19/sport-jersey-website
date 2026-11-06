function ProductFilter({ search, setSearch, category, setCategory }) {
  const categories = ["Semua", "Home", "Away"];

  return (
    <section className="bg-surface border border-border rounded-xl p-5 mt-6">
      {/* Search Input */}
      <div>
        <label className="block text-sm font-semibold mb-2">Cari Produk</label>

        <div className="flex items-center border border-border rounded-lg px-3 focus-within:ring-2 focus-within:ring-primary-light">
          <input
            type="text"
            placeholder="Cari nama jersey..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-3 outline-none text-sm bg-transparent"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="mt-5">
        <h3 className="text-sm font-semibold mb-3">Kategori</h3>

        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                category === item
                  ? "bg-primary text-white"
                  : "bg-background text-text-secondary hover:bg-border"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductFilter;
