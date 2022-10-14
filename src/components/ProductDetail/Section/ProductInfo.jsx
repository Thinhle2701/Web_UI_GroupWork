import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";

const ProductInfo = ({ detail, price, onAddToCart }) => {
  useEffect(() => {}, [detail]);

  console.log("price", price);
  console.log("product", detail.id);
  return (
    <div
      style={{
        height: "500px",
        width: "500px",
        paddingLeft: "30px",
        textAlign: "justify",
      }}
    >
      <p style={{ textAlign: "left", fontWeight: "bold" }}>Description</p>
      <div className="box">
        <div className="row">
          <p
            style={{
              fontSize: "20px",
              borderRadius: "10px",
              border: "4px solid 3B4CAF",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
            dangerouslySetInnerHTML={{ __html: detail.description }}
          ></p>
          {/* <span>${details.detail.price.formatted_with_symbol}</span> */}
        </div>

        <p style={{ fontSize: "30px", color: "rgb(245,114,36)" }}>{price}</p>

        <Button
          size="large"
          type="button"
          variant="contained"
          color="primary"
          onClick={()=>{onAddToCart(detail.id, 1)}}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
