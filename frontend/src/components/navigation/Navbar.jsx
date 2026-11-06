import { Link } from "react-router-dom";
import { useCart } from "../../features/cart/CartContext";

function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary">
          Sport Jersey
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-text-secondary hover:text-primary transition"
          >
            Beranda
          </Link>

          <Link
            to="/keranjang"
            className="relative flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>

            <span>Keranjang</span>

            {totalItems > 0 && (
              <span className="absolute -top-3 -right-3 min-w-5 h-5 px-1 rounded-full bg-secondary text-primary text-xs font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
