import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../cart/CartContext";

function CheckoutPage() {
  const { selectedItems, clearSelectedItems } = useCart();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("Transfer Bank");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedItems.length === 0) {
      return;
    }

    clearSelectedItems();
    setShowSuccessPopup(true);
  };

  if (selectedItems.length === 0 && !showSuccessPopup) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-primary">
          Belum Ada Produk yang Dipilih
        </h1>

        <p className="text-text-secondary mt-3">
          Silakan pilih produk yang ingin dibeli melalui keranjang.
        </p>

        <Link
          to="/keranjang"
          className="inline-block mt-6 bg-primary text-white px-6 py-3 rounded-lg font-semibold"
        >
          Kembali ke Keranjang
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-primary mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informasi Pengiriman */}
            <div className="lg:col-span-2 space-y-6">
              <section className="bg-surface border border-border rounded-xl p-6">
                <h2 className="font-bold text-lg text-primary mb-5">
                  Informasi Pengiriman
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nama Lengkap
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary-light"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Nomor Telepon
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary-light"
                      placeholder="Masukkan nomor telepon"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Alamat Lengkap
                    </label>

                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows="3"
                      className="w-full border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary-light"
                      placeholder="Masukkan alamat pengiriman"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Catatan Pesanan (Opsional)
                    </label>

                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows="2"
                      className="w-full border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary-light"
                      placeholder="Catatan tambahan untuk pesanan"
                    />
                  </div>
                </div>
              </section>

              {/* Metode Pembayaran */}
              <section className="bg-surface border border-border rounded-xl p-6">
                <h2 className="font-bold text-lg text-primary mb-5">
                  Metode Pembayaran
                </h2>

                <div className="space-y-3">
                  {["Transfer Bank", "E-Wallet", "COD (Bayar di Tempat)"].map(
                    (method) => (
                      <label
                        key={method}
                        className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition ${
                          paymentMethod === method
                            ? "border-primary bg-background"
                            : "border-border"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={paymentMethod === method}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        />

                        <span className="text-sm font-medium">{method}</span>
                      </label>
                    ),
                  )}
                </div>
              </section>
            </div>

            {/* Ringkasan Pesanan */}
            <div className="bg-surface border border-border rounded-xl p-6 h-fit">
              <h2 className="font-bold text-lg text-primary mb-5">
                Ringkasan Pesanan
              </h2>

              <div className="space-y-4">
                {selectedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-4 text-sm"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>

                      <p className="text-text-secondary">
                        {item.quantity} x {formatPrice(item.price)}
                      </p>
                    </div>

                    <p className="font-semibold whitespace-nowrap">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border mt-5 pt-5 flex justify-between">
                <span className="font-semibold">Total Pembayaran</span>

                <span className="font-bold text-primary">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-secondary text-primary font-semibold py-3 rounded-lg hover:bg-yellow-400 transition"
              >
                Buat Pesanan
              </button>

              <Link
                to="/keranjang"
                className="block text-center text-sm text-text-secondary mt-4 hover:text-primary"
              >
                Kembali ke Keranjang
              </Link>
            </div>
          </div>
        </form>
      </div>

      {/* Pop-up Pesanan Berhasil */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-8 text-center shadow-xl">
            {/* Ikon Centang Hijau */}
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9 text-green-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-gray-800">
              Pesanan Berhasil!
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Terima kasih telah berbelanja di Sport Jersey.
            </p>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="mt-6 w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CheckoutPage;
