import React, { useState, useEffect, Component } from "react";
import { useParams } from "react-router-dom";
import useStyle from "./styles";
import "./ProductDetail.css";
import { Row, Col } from "antd";
import DetailsThumb from "./DetailsThumb";
import ProductImage from "./Section/ProductImage";
import ProductInfo from "./Section/ProductInfo";
import axios from "axios"
import { async } from "@firebase/util";

const ProductDetail = ({ ProductList, detail, AddToCart}) => {
  const [isLoading,setIsLoading] = useState(true)
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
  console.log(product)
  useEffect(() => {
    // getProduct(productId);
   async function fetchProduct(productID){

      console.log("pro ne: ",productID);
      const url = "https://api.chec.io/v1/products/" + productID
     await axios.get(url,{
        headers: {
          "X-Authorization": "pk_4513267273233fc7080de820c6f5b5630e0fadf031a5a",
        },
      })
      .then(res => {
        setProduct(res.data);
        SetImg(res.data.assets)
        setPrice(res.data.price.formatted_with_symbol)
        // SetImg(res)
        setIsLoading(false)
      })
      .catch(error => console.log(error));
    }
    
    fetchProduct(productId);
  },[productId]);

  return (
    <div>
        {isLoading === true ? (
        <div style={{ textAlign: "center" }}>
          <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/6d391369321565.5b7d0d570e829.gif"></img>
        </div>):(    <div style={{ width: "100%", padding: "3rem 4rem" }}>
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
    </div>)}

    </div>
  );
};

export default ProductDetail;
