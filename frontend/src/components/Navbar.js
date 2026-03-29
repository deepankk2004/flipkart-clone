import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{
      background: "#2874f0",
      padding: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      color: "white"
    }}>
      <div>
        <h2 style={{ display: "inline" }}>Flipkart</h2>
        <Link to="/" style={{ marginLeft: "20px", color: "white" }}>
          Home
        </Link>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search for products..."
          style={{ padding: "5px", width: "300px" }}
        />
      </div>

      <div>
        <Link to="/cart" style={{ color: "white" }}>
          Cart
        </Link>
      </div>
    </div>
  );
}

export default Navbar;