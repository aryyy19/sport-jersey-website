import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}

export default MainLayout;
