import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

import HomePage from "./features/home/pages/HomePage";
import ProductDetail from "./features/products/pages/ProductDetail";
import CartPage from "./features/cart/pages/CartPage";
import CheckoutPage from "./features/checkout/pages/CheckoutPage";

import AdminDashboard from "./features/admin/pages/AdminDashboard";
import ProductForm from "./features/admin/pages/ProductForm";
import ProductEdit from "./features/admin/pages/ProductEdit";

import { CartProvider } from "./features/cart/CartContext";
import { ProductProvider } from "./utils/ProductContext";

function App() {
  return (
    <CartProvider>
      <ProductProvider>
        <BrowserRouter>
          <Routes>
            {/* Halaman pembeli */}
            <Route
              path="/"
              element={
                <MainLayout>
                  <HomePage />
                </MainLayout>
              }
            />

            <Route
              path="/produk/:id"
              element={
                <MainLayout>
                  <ProductDetail />
                </MainLayout>
              }
            />

            <Route
              path="/keranjang"
              element={
                <MainLayout>
                  <CartPage />
                </MainLayout>
              }
            />

            <Route
              path="/checkout"
              element={
                <MainLayout>
                  <CheckoutPage />
                </MainLayout>
              }
            />

            {/* Halaman admin */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />

              <Route path="add-product" element={<ProductForm />} />

              <Route path="edit-product/:id" element={<ProductEdit />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </CartProvider>
  );
}

export default App;
