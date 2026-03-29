import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "15px",
      margin: "15px",
      width: "220px",
      textAlign: "center",
      background: "white"
    }}>
      <img
        src={product.images[0]?.image_url}
        alt={product.name}
        style={{ width: "150px", height: "150px" }}
      />

      <h4>{product.name}</h4>
      <p style={{ color: "green", fontWeight: "bold" }}>
        ₹ {product.price}
      </p>

      <Link to={`/product/${product.id}`}>
        <button style={{
          background: "#fb641b",
          color: "white",
          border: "none",
          padding: "8px",
          cursor: "pointer"
        }}>
          View Product
        </button>
      </Link>
    </div>
  );
}

export default ProductCard;