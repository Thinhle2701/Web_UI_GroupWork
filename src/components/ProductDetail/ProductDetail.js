import React, { useState, useEffect, Component } from "react";
import { useParams } from "react-router-dom";
import useStyle from "./styles";
import "./ProductDetail.css";
import { Row, Col } from "antd";
import DetailsThumb from "./DetailsThumb";
import ProductImage from "./Section/ProductImage";
import ProductInfo from "./Section/ProductInfo";

const ProductDetail = ({ ProductList, detail, AddToCart}) => {
  const [product, setProduct] = useState({});
  const [img, SetImg] = useState([{}]);
  const { productId } = useParams();
  const [Price,setPrice] = useState(0)
  function getProduct(productId) {
    for (var i = 0; i < ProductList.length; i++) {
      if (ProductList[i].id == productId) {
        setProduct(ProductList[i]);
        SetImg(ProductList[i].assets);
        setPrice(ProductList[i].price.formatted_with_symbol)
      }
    }
  }
  //  console.log(product)
  useEffect(() => {
    getProduct(productId);
  },[product]);

  return (
    <div style={{ width: "100%", padding: "3rem 4rem" }}>
      <br />
      <Row gutter={[16, 16]} style={{ display: "flex" }}>
        <Col>
          <ProductImage detail={img} />
        </Col>

        <Col style={{ paddingLeft: "50px" }}>
          <p style={{ fontSize: "30px", fontWeight: "bold" }}>{product.name}</p>

          <Col>
            <ProductInfo detail={product} price={Price} onAddToCart={AddToCart}/>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetail;
