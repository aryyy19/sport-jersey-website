import { Link } from "react-router-dom";
import { useCart } from "../CartContext";

function CartPage() {
  const {
    cartItems,
    selectedItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    toggleSelection,
    toggleSelectAll,
  } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const totalPrice = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const allSelected =
    cartItems.length > 0 && cartItems.every((item) => item.selected);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-primary">Keranjang Belanja</h1>

        <p className="text-text-secondary mt-3">
          Keranjang belanjamu masih kosong.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
        >
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-primary mb-8">
        Keranjang Belanja
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {/* Pilih Semua */}
          <div className="flex items-center gap-3 bg-surface border border-border rounded-xl p-4">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={(e) => toggleSelectAll(e.target.checked)}
              className="w-4 h-4 accent-blue-800"
            />

            <span className="text-sm font-medium">
              Pilih Semua Produk ({cartItems.length})
            </span>
          </div>

          {/* Daftar Produk */}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-4 bg-surface border border-border rounded-xl p-4"
            >
              <input
                type="checkbox"
                checked={item.selected}
                onChange={() => toggleSelection(item.id)}
                className="w-4 h-4 accent-blue-800 mt-2"
              />

              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h2 className="font-semibold text-primary">{item.name}</h2>

                <p className="text-sm text-text-secondary mt-2">
                  {formatPrice(item.price)}
                </p>

                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="w-8 h-8 border border-border rounded-lg hover:bg-background"
                  >
                    -
                  </button>

                  <span className="font-semibold">{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    disabled={item.quantity >= item.stock}
                    className="w-8 h-8 border border-border rounded-lg hover:bg-background disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-row sm:flex-col justify-between items-center sm:items-end">
                <p className="font-bold text-primary">
                  {formatPrice(item.price * item.quantity)}
                </p>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm text-red-500 hover:text-red-700 mt-2"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Ringkasan Belanja */}
        <div className="bg-surface border border-border rounded-xl p-6 h-fit">
          <h2 className="font-bold text-lg text-primary">Ringkasan Belanja</h2>

          <div className="flex justify-between mt-6">
            <span className="text-text-secondary">Produk Dipilih</span>

            <span className="font-medium">{selectedItems.length} produk</span>
          </div>

          <div className="flex justify-between mt-3">
            <span className="text-text-secondary">Total Harga</span>

            <span className="font-bold text-primary">
              {formatPrice(totalPrice)}
            </span>
          </div>

          {selectedItems.length > 0 ? (
            <Link
              to="/checkout"
              className="block w-full text-center mt-6 bg-secondary text-primary font-semibold py-3 rounded-lg hover:bg-yellow-400 transition"
            >
              Lanjut ke Checkout
            </Link>
          ) : (
            <button
              disabled
              className="w-full mt-6 bg-gray-300 text-gray-500 font-semibold py-3 rounded-lg cursor-not-allowed"
            >
              Pilih Produk Dahulu
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartPage;
