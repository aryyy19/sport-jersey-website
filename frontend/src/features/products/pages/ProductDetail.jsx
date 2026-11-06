import { useParams } from "react-router-dom";
import products from "../../../data/products";
import { useCart } from "../../cart/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-primary">
          Produk tidak ditemukan
        </h2>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-surface rounded-2xl overflow-hidden border border-border">
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-square object-cover"
          />
        </div>

        <div>
          <span className="text-sm text-text-secondary">
            Kategori {product.category}
          </span>

          <h1 className="text-3xl font-bold text-primary mt-2">
            {product.name}
          </h1>

          <p className="text-2xl font-bold text-primary mt-6">
            {formatPrice(product.price)}
          </p>

          <p className="text-sm text-text-secondary mt-4">
            Stok tersedia: {product.stock}
          </p>

          <div className="border-t border-border mt-6 pt-6">
            <h2 className="font-semibold text-lg">Deskripsi Produk</h2>

            <p className="text-text-secondary mt-2 leading-relaxed">
              Jersey pilihan dengan desain menarik dan nyaman digunakan untuk
              mendukung tim kesayanganmu.
            </p>
          </div>

          <button
            onClick={() => addToCart(product)}
            disabled={product.stock <= 0}
            className="w-full mt-8 bg-secondary text-primary font-semibold py-3 rounded-lg hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {product.stock > 0 ? "Tambah ke Keranjang" : "Stok Habis"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
