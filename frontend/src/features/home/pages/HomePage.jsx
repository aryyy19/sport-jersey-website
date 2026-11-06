import { useState } from "react";

import HeroSection from "../components/HeroSection";
import ProductFilter from "../components/ProductFilter";
import ProductList from "../../products/pages/ProductList";

function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <HeroSection />

      <ProductFilter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      />

      <ProductList search={search} category={category} />
    </div>
  );
}

export default HomePage;
