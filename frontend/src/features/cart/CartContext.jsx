import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Menambahkan produk ke keranjang
  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          return currentItems;
        }

        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      if (product.stock <= 0) {
        return currentItems;
      }

      return [...currentItems, { ...product, quantity: 1, selected: true }];
    });
  };

  // Memilih atau membatalkan pilihan produk
  const toggleSelection = (id) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item,
      ),
    );
  };

  // Memilih atau membatalkan semua produk
  const toggleSelectAll = (selected) => {
    setCartItems((currentItems) =>
      currentItems.map((item) => ({
        ...item,
        selected,
      })),
    );
  };

  // Menambah jumlah produk
  const increaseQuantity = (id) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  // Mengurangi jumlah produk
  const decreaseQuantity = (id) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // Menghapus satu produk dari keranjang
  const removeFromCart = (id) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    );
  };

  // Menghapus semua produk yang sudah dipilih
  const clearSelectedItems = () => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => !item.selected),
    );
  };

  // Daftar produk yang dipilih
  const selectedItems = cartItems.filter((item) => item.selected);

  // Menghitung seluruh jumlah produk di keranjang
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        selectedItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        toggleSelection,
        toggleSelectAll,
        totalItems,
        clearSelectedItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
