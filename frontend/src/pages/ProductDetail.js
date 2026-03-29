import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`products/${id}/`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const addToCart = () => {
    API.post("cart/add/", {
      product_id: product.id,
      quantity: 1
    }).then(() => alert("Added to cart"));
  };

  const buyNow = () => {
    API.post("cart/add/", {
      product_id: product.id,
      quantity: 1
    }).then(() => navigate("/cart"));
  };

  if (!product) return <h2 style={{ padding: "20px" }}>Loading...</h2>;

  return (
    <div style={{ background: "#f1f3f6", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ display: "flex", padding: "30px" }}>
        
        {/* LEFT SIDE - IMAGE */}
        <div style={{ background: "white", padding: "20px", width: "35%" }}>
          <img
            src={
              product.images && product.images.length > 0
                ? product.images[0].image_url
                : "https://via.placeholder.com/300"
            }
            alt=""
            style={{ width: "100%" }}
          />

          <div style={{ marginTop: "20px" }}>
            <button
              onClick={addToCart}
              style={{
                background: "#ff9f00",
                color: "white",
                padding: "12px",
                border: "none",
                width: "45%",
                marginRight: "10px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Add to Cart
            </button>

            <button
              onClick={buyNow}
              style={{
                background: "#fb641b",
                color: "white",
                padding: "12px",
                border: "none",
                width: "45%",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - PRODUCT DETAILS */}
        <div style={{ marginLeft: "30px", width: "65%" }}>
          <h2>{product.name}</h2>

          <h1 style={{ color: "green" }}>₹ {product.price}</h1>

          <p><b>Available Stock:</b> {product.stock}</p>

          <div style={{ background: "white", padding: "15px", marginTop: "20px" }}>
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div style={{ background: "white", padding: "15px", marginTop: "20px" }}>
            <h3>Specifications</h3>
            <ul>
              <li>High Quality Product</li>
              <li>Cash on Delivery Available</li>
              <li>7 Days Replacement</li>
              <li>Free Delivery</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;