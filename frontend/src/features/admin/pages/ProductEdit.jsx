import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../../utils/ProductContext";
import toast from "react-hot-toast";

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { categories, isCategoriesLoading, getProductById, updateProduct } =
    useProducts();

  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
    price: "",
    stock: "",
    description: "",
    img: null,
  });

  const [oldImage, setOldImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mengambil data produk berdasarkan ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductById(id);

        setFormData({
          name: product.name || "",
          category_id: product.category?.id || "",
          price: product.price || "",
          stock: product.stock || "",
          description: product.description || "",
          img: null,
        });

        setOldImage(product.img_url);
      } catch (error) {
        toast.error("Gagal mengambil data produk.");
        navigate("/admin/dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Mengubah nilai input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Mengambil gambar baru
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData((prev) => ({
        ...prev,
        img: file,
      }));

      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Mengirim perubahan produk
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

    updateProduct.mutate(
      { id, formData: data },
      {
        onSuccess: () => {
          toast.success("Produk berhasil diperbarui!");
          navigate("/admin/dashboard");
        },
        onError: (error) => {
          const errors = error.response?.data?.errors;

          if (errors) {
            Object.values(errors)
              .flat()
              .forEach((message) => toast.error(message));
          } else {
            toast.error(
              error.response?.data?.message || "Gagal memperbarui produk.",
            );
          }
        },
      },
    );
  };

  if (isLoading || isCategoriesLoading) {
    return <p className="p-6 text-gray-600">Memuat data produk...</p>;
  }

  return (
    <div className="max-w-xl rounded-lg bg-white p-6 shadow">
      <h1 className="mb-6 border-b pb-4 text-xl font-bold text-gray-800">
        Edit Produk
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
            className="w-full rounded-lg border p-2"
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
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Gambar Produk
          </label>

          {(previewImage || oldImage) && (
            <img
              src={previewImage || oldImage}
              alt="Preview produk"
              className="mb-3 h-40 w-40 rounded-lg border object-cover"
            />
          )}

          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleImageChange}
            className="w-full rounded-lg border p-2"
          />

          <p className="mt-1 text-xs text-gray-500">
            Kosongkan jika tidak ingin mengganti gambar.
          </p>
        </div>

        <button
          type="submit"
          disabled={updateProduct.isPending}
          className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {updateProduct.isPending ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
}
