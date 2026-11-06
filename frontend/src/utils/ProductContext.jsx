import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import apiClient from "./apiClient";

const ProductContext = createContext();

// Menyediakan data dan fungsi produk kepada komponen React lainnya
export const ProductProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // Mengambil seluruh kategori dari API
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await apiClient.get("/categories");
      return response.data.data;
    },
  });

  // Mengambil daftar produk dari API
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await apiClient.get("/products");
      return response.data.data;
    },
  });

  // Mengambil statistik seluruh produk dan kategori dari database
  const {
    data: stats,
    isLoading: isStatsLoading,
    isError: isStatsError,
    error: statsError,
  } = useQuery({
    queryKey: ["productStats"],
    queryFn: async () => {
      const response = await apiClient.get("/products/stats");
      return response.data;
    },
  });

  // Mengambil detail produk berdasarkan ID
  const getProductById = async (id) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data.data;
  };

  // Mengambil produk berdasarkan halaman, jumlah data, kategori, dan kata kunci
  const getProducts = async (
    page = 1,
    limit = 5,
    category_id = "",
    keyword = "",
  ) => {
    const response = await apiClient.get("/products", {
      params: {
        page,
        limit,
        category_id,
        keyword,
      },
    });

    return response.data;
  };

  // Menambahkan produk baru ke database
  const addProduct = useMutation({
    mutationFn: async (formData) => {
      return await apiClient.post("/products", formData);
    },
    onSuccess: () => {
      // Memperbarui daftar produk dan statistik setelah produk ditambahkan
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["productStats"] });
    },
  });

  // Memperbarui data produk berdasarkan ID
  const updateProduct = useMutation({
    mutationFn: async ({ id, formData }) => {
      return await apiClient.post(`/products/${id}?_method=PUT`, formData);
    },
    onSuccess: () => {
      // Memperbarui daftar produk dan statistik setelah produk diedit
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["productStats"] });
    },
  });

  // Menghapus produk berdasarkan ID
  const deleteProduct = useMutation({
    mutationFn: async (id) => {
      return await apiClient.delete(`/products/${id}`);
    },
    onSuccess: () => {
      // Memperbarui daftar produk dan statistik setelah produk dihapus
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["productStats"] });
    },
  });

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoading,
        isError,
        error,
        categories,
        isCategoriesLoading,
        stats,
        isStatsLoading,
        isStatsError,
        statsError,
        getProductById,
        getProducts,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Hook untuk mengakses data dan fungsi dari ProductContext
export const useProducts = () => {
  return useContext(ProductContext);
};
