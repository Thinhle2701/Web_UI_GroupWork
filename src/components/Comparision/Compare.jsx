import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import { Link } from "react-router-dom";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";

const Compare = ({ products }) => {
  const [checkChooseProductOne, setcheckChooseProductOne] = useState(false);
  const [checkChooseProductTwo, setcheckChooseProductTwo] = useState(false);
  const [productListOne, setProductListOne] = useState([]);
  const [selectProductOne, setSelectProductOne] = useState({});
  const [productListTwo, setProductListTwo] = useState([]);
  const [selectProductTwo, setSelectProductTwo] = useState({});
  const [categories, setCategories] = useState([
    { id: "", slug: "", name: "" },
  ]);

  const [PricePD1, setPricePD1] = useState({formatted: "",
  formatted_with_code: "",
  formatted_with_symbol: "",
  raw: 0});
  const [PricePD2, setPricePD2] = useState({formatted: "",
  formatted_with_code: "",
  formatted_with_symbol: "",
  raw: 0});

  const [ImagesProduct1, setImagesProduct1] = useState([]);
  const [ImagesProduct2, setImagesProduct2] = useState([]);

  function fetchProduct(products) {
    setProductListOne(products);
  }
  useEffect(() => {
    fetchProduct(products);
  }, [products]);

  function handleFilterProductListTwo(category, productName) {
    var array = [];
    for (var i = 0; i < products.length; i++) {
      if (
        products[i].categories[0].name == category &&
        products[i].name != productName
      ) {
        array.push(products[i]);
      }
    }

    setProductListTwo(array);
  }
  console.log(PricePD1)
  function handleChangeImageProductOne(img) {
    var images = [];
    for (var i = 0; i < img.length; i++) {
      images.push({
        original: img[i].url,
        thumbnail: img[i].url,
      });
    }
    setImagesProduct1(images);
  }

  console.log("Price",PricePD1.formatted_with_symbol)
  function handleChangeImageProductTwo(img) {
    var images = [];
    for (var i = 0; i < img.length; i++) {
      images.push({
        original: img[i].url,
        thumbnail: img[i].url,
      });
    }
    setImagesProduct2(images);
  }

  function handleChange(e) {
    setcheckChooseProductOne(true);
    setcheckChooseProductTwo(false)
    for (var i = 0; i < productListOne.length; i++) {
      if (productListOne[i].id === e.target.value) {
        setSelectProductOne(productListOne[i]);
        setCategories(productListOne[i].categories);
        setPricePD1(productListOne[i].price)

        handleFilterProductListTwo(
          productListOne[i].categories[0].name,
          productListOne[i].name
        );
        handleChangeImageProductOne(productListOne[i].assets);
      }
    }
  }

  return (
    <div>
      <p
        style={{
          marginTop: "100px",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        hello
      </p>

      <div style={{ marginLeft: "50px", marginRight: "50px" }}>
        <table
          style={{
            backgroundColor: "white",
            borderWidth: "1px",
            borderColor: "#aaaaaa",
            borderStyle: "solid",
            width: "100%",
          }}
        >
          <tr>
            <th style={{ textAlign: "center", width: "20%" }}>Name</th>

            <th
              style={{
                textAlign: "center",
                width: "40%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item>
                <InputLabel
                  style={{
                    color: "black",
                    textAlign: "center",
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  Product 1
                </InputLabel>
                <Select
                  style={{ selectColor: "blue" }}
                  fullWidth
                  value={selectProductOne.name}
                  onChange={(e) => {
                    setcheckChooseProductTwo(false)
                    handleChange(e);
                  }}
                >
                  {productListOne.map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                      <div
                        style={{ display: "inline-flex", textAlign: "center" }}
                      >
                        <img
                          style={{ height: "100px", width: "150px" }}
                          src={product.image.url}
                        ></img>
                        <p
                          style={{
                            textAlign: "center",
                            paddingTop: "20px",
                            color: "black",
                            fontSize: "20px",
                            fontWeight: "bold",
                          }}
                        >
                          {product.name}
                        </p>
                      </div>
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </th>

            <th
              style={{
                textAlign: "center",
                width: "40%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item>
                <InputLabel
                  style={{
                    color: "black",
                    textAlign: "center",
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  Product 2
                </InputLabel>
                <Select
                  fullWidth
                  value={selectProductTwo.name}
                  onChange={(e) => {
                    for (var i = 0; i < productListOne.length; i++) {
                      if (productListOne[i].id === e.target.value) {
                        setSelectProductTwo(productListOne[i]);
                        setcheckChooseProductTwo(true);
                        setPricePD2(productListOne[i].price)
                        handleChangeImageProductTwo(productListOne[i].assets);
                      }
                    }
                  }}
                >
                  {productListTwo.map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                      <div
                        style={{ display: "inline-flex", textAlign: "center" }}
                      >
                        <img
                          style={{ height: "100px", width: "150px" }}
                          src={product.image.url}
                        ></img>
                        <p
                          style={{
                            textAlign: "center",
                            paddingTop: "20px",
                            color: "black",
                            fontSize: "20px",
                            fontWeight: "bold",
                          }}
                        >
                          {product.name}
                        </p>
                      </div>
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </th>
          </tr>
          <tr style={{ backgroundColor: "white", height: "100px" }}>
            <th style={{ textAlign: "center" }}>
              <p>Description</p>
            </th>

            <th
              style={{
                textAlign: "justify",
                alignItem: "center",
              }}
            >
              <p
                dangerouslySetInnerHTML={{
                  __html: selectProductOne.description,
                }}
              ></p>
            </th>

            <th
              style={{
                textAlign: "justify",
                alignItem: "center",
              }}
            >
              {checkChooseProductTwo === true ? (
                <p
                dangerouslySetInnerHTML={{
                  __html: selectProductTwo.description,
                }}
              ></p>
              ) : (
                <p></p>
              )}

            </th>
          </tr>
          <tr style={{ height: "100px" }}>
            <th style={{ textAlign: "center" }}>
              <p>Images</p>
            </th>
            <th style={{ textAlign: "center" }}>
              {checkChooseProductOne === true ? (
                <div style={{ width: "250px", paddingLeft: "190px" }}>
                  <ImageGallery items={ImagesProduct1} />
                </div>
              ) : (
                <p></p>
              )}
            </th>

            <th style={{ textAlign: "center" }}>
              {checkChooseProductTwo === true ? (
                <div style={{ width: "250px", paddingLeft: "190px" }}>
                  <ImageGallery items={ImagesProduct2} />
                </div>
              ) : (
                <p></p>
              )}
            </th>
          </tr>

          <tr style={{backgroundColor:'white'}}>
            <th style={{textAlign:'center'}}>
              <p>Price</p>
            </th>

            <th style={{textAlign:'center',fontSize:"25px"}}> 
            {checkChooseProductOne === true ? (
              <p>{PricePD1.formatted_with_code}</p>
              ) : (
                <p></p>
              )}
            </th>

            <th style={{textAlign:'center',fontSize:"25px"}}>
            {checkChooseProductTwo === true ? (
              <p style={{}}>{PricePD2.formatted_with_code}</p>
              ) : (
                <p></p>
              )}
            </th>
          </tr>

          <tr>
            <th></th>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Compare;
