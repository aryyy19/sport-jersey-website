import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link
      to={`/produk/${product.id}`}
      className="block bg-surface border border-border rounded-xl overflow-hidden hover:shadow-lg transition group"
    >
      <div className="aspect-square bg-background overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      <div className="p-4">
        <span className="text-xs text-text-secondary">{product.category}</span>

        <h3 className="font-semibold text-sm mt-1 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-primary font-bold mt-3">
          {formatPrice(product.price)}
        </p>

        <p className="text-xs text-text-secondary mt-1">
          Stok: {product.stock}
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;
