import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("products/")
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ background: "#f1f3f6" }}>
      <Navbar />

      <div style={{ display: "flex", flexWrap: "wrap", padding: "20px" }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;