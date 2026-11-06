import products from "../../../data/products";
import ProductCard from "../components/ProductCard";

function ProductList({ search, category }) {
  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory = category === "Semua" || product.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <section id="products" className="mt-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary">Koleksi Jersey</h2>

        <p className="text-text-secondary text-sm mt-1">
          Temukan jersey favoritmu dari koleksi kami.
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-surface rounded-xl border border-border">
          <p className="text-text-secondary">Produk tidak ditemukan.</p>
        </div>
      )}
    </section>
  );
}

export default ProductList;
