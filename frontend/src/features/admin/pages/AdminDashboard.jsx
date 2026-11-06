import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../../utils/ProductContext";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  // Mengambil data dan fungsi yang tersedia dari ProductContext
  const {
    categories,
    isLoading,
    isError,
    error,
    stats,
    isStatsLoading,
    isStatsError,
    statsError,
    getProducts,
    deleteProduct,
  } = useProducts();

  // State untuk menyimpan input pencarian
  const [searchInput, setSearchInput] = useState("");

  // State untuk menyimpan kata kunci pencarian yang dikirim ke API
  const [searchTerm, setSearchTerm] = useState("");

  // State untuk menyimpan kategori yang dipilih
  const [selectedCategory, setSelectedCategory] = useState("");

  // State untuk mengatur halaman pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Jumlah produk yang ditampilkan pada setiap halaman
  const limit = 5;

  // State untuk menyimpan daftar produk dari API
  const [productData, setProductData] = useState([]);

  // State untuk menyimpan informasi pagination dari Laravel
  const [pagination, setPagination] = useState(null);

  // State untuk mengetahui apakah produk sedang dimuat
  const [isFetching, setIsFetching] = useState(false);

  // Mengubah angka menjadi format mata uang Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number || 0);
  };

  // Mengambil produk dari API berdasarkan halaman, kategori, dan pencarian
  useEffect(() => {
    let active = true;

    const fetchProducts = async () => {
      setIsFetching(true);

      try {
        // Meminta data produk sesuai parameter yang dipilih
        const response = await getProducts(
          currentPage,
          limit,
          selectedCategory,
          searchTerm,
        );

        // Memperbarui daftar produk jika komponen masih aktif
        if (active) {
          setProductData(response.data || []);
          setPagination(response.meta || null);
        }
      } catch (err) {
        // Menampilkan pesan jika pengambilan produk gagal
        if (active) {
          toast.error(
            err.response?.data?.message || "Gagal mengambil data produk.",
          );
        }
      } finally {
        // Menghentikan indikator loading jika komponen masih aktif
        if (active) {
          setIsFetching(false);
        }
      }
    };

    fetchProducts();

    // Mencegah pembaruan state ketika komponen sudah tidak aktif
    return () => {
      active = false;
    };
  }, [currentPage, limit, selectedCategory, searchTerm, getProducts]);

  // Menjalankan pencarian ketika tombol Cari ditekan
  const handleSearch = (e) => {
    e.preventDefault();

    // Mengembalikan halaman ke halaman pertama saat mencari
    setCurrentPage(1);

    // Mengirim kata kunci pencarian ke API
    setSearchTerm(searchInput.trim());
  };

  // Mengubah kategori produk yang ingin ditampilkan
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);

    // Mengembalikan halaman ke halaman pertama saat kategori berubah
    setCurrentPage(1);
  };

  // Menghapus produk berdasarkan ID
  const handleDelete = (id) => {
    // Meminta konfirmasi sebelum menghapus produk
    const confirmDelete = window.confirm(
      "Apakah kamu yakin ingin menghapus produk ini?",
    );

    if (confirmDelete) {
      // Menjalankan proses penghapusan melalui React Query
      deleteProduct.mutate(id, {
        onSuccess: async () => {
          toast.success("Produk berhasil dihapus.");

          try {
            // Mengambil ulang daftar produk setelah penghapusan
            const response = await getProducts(
              currentPage,
              limit,
              selectedCategory,
              searchTerm,
            );

            setProductData(response.data || []);
            setPagination(response.meta || null);

            // Jika halaman saat ini kosong, kembali ke halaman sebelumnya
            if (response.data.length === 0 && currentPage > 1) {
              setCurrentPage((prev) => prev - 1);
            }
          } catch {
            // Menampilkan pesan jika daftar produk gagal diperbarui
            toast.error("Gagal memperbarui daftar produk.");
          }
        },

        onError: () => {
          // Menampilkan pesan jika penghapusan produk gagal
          toast.error("Gagal menghapus produk.");
        },
      });
    }
  };

  // Menampilkan loading ketika data awal produk sedang diambil
  if (isLoading) {
    return <p className="text-gray-600">Memuat dashboard...</p>;
  }

  // Menampilkan pesan jika pengambilan data produk gagal
  if (isError) {
    return (
      <p className="text-red-600">
        Gagal mengambil data produk: {error.message}
      </p>
    );
  }

  return (
    <div className="space-y-5">
      {/* Judul Dashboard */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

        <p className="mt-1 text-sm text-gray-500">
          Selamat datang di halaman pengelolaan Sport Jersey.
        </p>
      </div>

      {/* Statistik Dashboard */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Total Produk */}
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">Total Produk</p>

          <h2 className="mt-1 text-xl font-bold text-gray-800">
            {isStatsLoading
              ? "Memuat..."
              : isStatsError
                ? "Gagal dimuat"
                : (stats?.total_products ?? 0)}
          </h2>
        </div>

        {/* Total Stok */}
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">Total Stok</p>

          <h2 className="mt-1 text-xl font-bold text-gray-800">
            {isStatsLoading
              ? "Memuat..."
              : isStatsError
                ? "Gagal dimuat"
                : (stats?.total_stock ?? 0)}
          </h2>
        </div>

        {/* Jumlah Kategori */}
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">Jumlah Kategori</p>

          <h2 className="mt-1 text-xl font-bold text-gray-800">
            {isStatsLoading
              ? "Memuat..."
              : isStatsError
                ? "Gagal dimuat"
                : (stats?.total_categories ?? 0)}
          </h2>
        </div>
      </div>

      {/* Daftar Produk */}
      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        {/* Bagian Pencarian, Filter, dan Tambah Produk */}
        <div className="flex flex-col gap-3 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Form Pencarian dan Filter Kategori */}
          <form
            onSubmit={handleSearch}
            className="flex flex-wrap items-center gap-2"
          >
            {/* Filter berdasarkan kategori */}
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="h-9 w-44 rounded-md border border-gray-300 bg-white px-2 text-sm outline-none focus:border-blue-500"
            >
              <option value="">Semua Kategori</option>

              {categories?.map((category) => (
                <option
                  key={category.category_id ?? category.id}
                  value={category.category_id ?? category.id}
                >
                  {category.category}
                </option>
              ))}
            </select>

            {/* Input kata kunci pencarian */}
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Cari produk..."
              className="h-9 w-48 rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-blue-500"
            />

            {/* Tombol menjalankan pencarian */}
            <button
              type="submit"
              className="h-9 rounded-md bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700"
            >
              Cari
            </button>
          </form>

          {/* Tombol menuju halaman tambah produk */}
          <Link
            to="/admin/add-product"
            className="inline-flex h-9 items-center justify-center rounded-md bg-green-600 px-4 text-sm font-medium text-white hover:bg-green-700"
          >
            + Tambah Produk
          </Link>
        </div>

        {/* Tabel Daftar Produk */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            {/* Header Tabel */}
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3">No.</th>
                <th className="px-4 py-3">Gambar</th>
                <th className="px-4 py-3">Nama Produk</th>
                <th className="px-4 py-3">Harga</th>
                <th className="px-4 py-3">Stok</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>

            {/* Isi Tabel */}
            <tbody className="divide-y divide-gray-100">
              {productData.length > 0 ? (
                productData.map((product, index) => (
                  <tr
                    key={product.id ?? product.product_id}
                    className="hover:bg-gray-50"
                  >
                    {/* Nomor urut produk */}
                    <td className="px-4 py-3">
                      {(currentPage - 1) * limit + index + 1}
                    </td>

                    {/* Gambar produk */}
                    <td className="px-4 py-3">
                      {product.img_url ? (
                        <img
                          src={product.img_url}
                          alt={product.name}
                          className="h-14 w-14 rounded-md border object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-md bg-gray-100 text-xs text-gray-400">
                          No Image
                        </div>
                      )}
                    </td>

                    {/* Nama dan kategori produk */}
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-800">
                        {product.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {product.category?.name ||
                          product.category?.category ||
                          "Tanpa kategori"}
                      </p>
                    </td>

                    {/* Harga produk dalam Rupiah */}
                    <td className="whitespace-nowrap px-4 py-3">
                      {formatRupiah(product.price)}
                    </td>

                    {/* Stok produk */}
                    <td className="px-4 py-3">{product.stock}</td>

                    {/* Tombol Edit dan Hapus */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {/* Menuju halaman edit produk */}
                        <Link
                          to={`/admin/edit-product/${product.id ?? product.product_id}`}
                          className="rounded bg-yellow-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-yellow-600"
                        >
                          Edit
                        </Link>

                        {/* Menghapus produk */}
                        <button
                          onClick={() =>
                            handleDelete(product.id ?? product.product_id)
                          }
                          disabled={deleteProduct.isPending}
                          className="rounded bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-50"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                // Pesan ketika tidak ada produk yang ditemukan
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    {isFetching
                      ? "Memuat produk..."
                      : "Produk tidak ditemukan."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Navigasi Pagination */}
        {pagination && pagination.last_page > 1 && (
          <div className="flex justify-center border-t px-4 py-4">
            <div className="flex items-center gap-1">
              {/* Tombol menuju halaman sebelumnya */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1 || isFetching}
                className="rounded-md border px-3 py-2 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Sebelumnya
              </button>

              {/* Membuat tombol nomor halaman secara otomatis */}
              {Array.from(
                { length: pagination.last_page },
                (_, index) => index + 1,
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  disabled={isFetching}
                  className={`rounded-md px-3 py-2 text-sm ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "border hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Tombol menuju halaman berikutnya */}
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(pagination.last_page, prev + 1),
                  )
                }
                disabled={currentPage === pagination.last_page || isFetching}
                className="rounded-md border px-3 py-2 text-sm hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Berikutnya
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
