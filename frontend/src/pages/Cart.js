import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const fetchCart = () => {
    API.get("cart/")
      .then(res => {
        setCartItems(res.data.cart);
        setTotal(res.data.total);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = (product_id, quantity) => {
    if (quantity < 1) return;

    API.post("cart/update/", {
      product_id: product_id,
      quantity: quantity
    }).then(() => {
      fetchCart();
    });
  };

  const removeItem = (product_id) => {
    API.post("cart/remove/", {
      product_id: product_id
    }).then(() => {
      fetchCart();
    });
  };

  return (
    <div style={{ background: "#f1f3f6", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ display: "flex", padding: "30px", gap: "20px" }}>
        
        {/* LEFT SIDE - CART ITEMS */}
        <div style={{ flex: 2 }}>
          {cartItems.length === 0 ? (
            <div style={{ background: "white", padding: "40px" }}>
              <h2>Your cart is empty</h2>
            </div>
          ) : (
            cartItems.map(item => (
              <div
                key={item.id}
                style={{
                  background: "white",
                  marginBottom: "15px",
                  padding: "20px",
                  display: "flex",
                  boxShadow: "0 0 5px rgba(0,0,0,0.1)"
                }}
              >
                {/* Product Image */}
                <img
                  src={
                    item.product.images && item.product.images.length > 0
                      ? item.product.images[0].image_url
                      : "https://via.placeholder.com/120"
                  }
                  alt=""
                  style={{ width: "120px", height: "120px", objectFit: "cover" }}
                />

                {/* Product Info */}
                <div style={{ marginLeft: "20px" }}>
                  <h3>{item.product.name}</h3>
                  <h4>₹ {item.product.price}</h4>

                  {/* Quantity Controls */}
                  <div style={{ marginTop: "10px" }}>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      style={{ padding: "5px 10px" }}
                    >
                      -
                    </button>

                    <span style={{ margin: "0 15px" }}>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      style={{ padding: "5px 10px" }}
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.product.id)}
                    style={{
                      marginTop: "15px",
                      background: "none",
                      border: "none",
                      color: "red",
                      cursor: "pointer"
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SIDE - PRICE DETAILS */}
        <div
          style={{
            flex: 1,
            background: "white",
            padding: "20px",
            height: "250px",
            boxShadow: "0 0 5px rgba(0,0,0,0.1)"
          }}
        >
          <h3>PRICE DETAILS</h3>
          <hr />

          <p>Total Items: {cartItems.length}</p>
          <h2>Total: ₹ {total}</h2>

          <button
            onClick={() => navigate("/checkout")}
            style={{
              background: "#fb641b",
              color: "white",
              padding: "12px",
              border: "none",
              marginTop: "20px",
              width: "100%",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;