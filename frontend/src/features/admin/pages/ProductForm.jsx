import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../../utils/ProductContext";
import toast from "react-hot-toast";

export default function ProductForm() {
  const navigate = useNavigate();

  const { categories, isCategoriesLoading, addProduct } = useProducts();

  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    price: "",
    stock: "",
    description: "",
    img: null,
  });

  // Mengubah nilai input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Mengambil file gambar
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      img: e.target.files[0],
    });
  };

  // Mengirim data produk
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("category_id", formData.category_id);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("description", formData.description);

    if (formData.img) {
      data.append("img", formData.img);
    }

    addProduct.mutate(data, {
      onSuccess: () => {
        toast.success("Produk berhasil ditambahkan!");
        navigate("/admin/dashboard");
      },
      onError: (error) => {
        const errors = error.response?.data?.errors;

        if (errors) {
          Object.values(errors)
            .flat()
            .forEach((message) => {
              toast.error(message);
            });
        } else {
          toast.error(
            error.response?.data?.message || "Gagal menambahkan produk.",
          );
        }
      },
    });
  };

  return (
    <div className="max-w-xl rounded-lg bg-white p-6 shadow">
      <h1 className="mb-6 border-b pb-4 text-xl font-bold text-gray-800">
        Tambah Produk
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Nama Produk
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Masukkan nama produk"
            className="w-full rounded-lg border p-2 outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Kategori
          </label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full rounded-lg border p-2"
            required
          >
            <option value="">Pilih Kategori</option>

            {categories?.map((category) => (
              <option
                key={category.category_id ?? category.id}
                value={category.category_id ?? category.id}
              >
                {category.category}
              </option>
            ))}
          </select>

          {isCategoriesLoading && (
            <p className="mt-1 text-sm text-gray-500">Memuat kategori...</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Harga
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Masukkan harga produk"
            className="w-full rounded-lg border p-2"
            min="0"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Stok
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Masukkan jumlah stok"
            className="w-full rounded-lg border p-2"
            min="0"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Deskripsi
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Masukkan deskripsi produk"
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Gambar Produk
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full rounded-lg border p-2"
          />
        </div>

        <button
          type="submit"
          disabled={addProduct.isPending}
          className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {addProduct.isPending ? "Menyimpan..." : "Simpan Produk"}
        </button>
      </form>
    </div>
  );
}
