import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Product from "./Product/Product";
import useStyles from "./styles";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const Products = ({
  products,
  onAddToCart,
  onDetailProduct,
  handleFilterProduct,
  handleFilterCategory,
}) => {

  const classes = useStyles();
  return (
    <div>
      <div className={classes.filter}>
        <div className={classes.item}>
          <img
            className={classes.img}
            onClick={() => handleFilterProduct("Mac")}
            width="200"
            height="130"
            alt=""
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-mac-nav-202203?wid=400&amp;hei=260&amp;fmt=png-alpha&amp;.v=1645051958490"
            srcSet="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-mac-nav-202203?wid=200&amp;hei=130&amp;fmt=png-alpha&amp;.v=1645051958490, https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-mac-nav-202203?wid=400&amp;hei=260&amp;fmt=png-alpha&amp;.v=1645051958490 2x"
          />
          <span className={classes.caption}>Mac</span>
        </div>

        <div className={classes.item}>
          <img
            className={classes.img}
            onClick={() => handleFilterProduct("iPhone")}
            width="200"
            height="130"
            alt=""
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-iphone-nav-202109_GEO_US?wid=400&amp;hei=260&amp;fmt=png-alpha&amp;.v=1630706116000"
            srcSet="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-iphone-nav-202109_GEO_US?wid=200&amp;hei=130&amp;fmt=png-alpha&amp;.v=1630706116000, https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-iphone-nav-202109_GEO_US?wid=400&amp;hei=260&amp;fmt=png-alpha&amp;.v=1630706116000 2x"
          ></img>
          <span className={classes.caption}>iPhone</span>
        </div>

        <div className={classes.item}>
          <img
            className={classes.img}
            onClick={() => handleFilterProduct("iPad")}
            width="200"
            height="130"
            alt=""
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-ipad-nav-202108?wid=400&amp;hei=260&amp;fmt=png-alpha&amp;.v=1625783381000"
            srcSet="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-ipad-nav-202108?wid=200&amp;hei=130&amp;fmt=png-alpha&amp;.v=1625783381000, https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-ipad-nav-202108?wid=400&amp;hei=260&amp;fmt=png-alpha&amp;.v=1625783381000 2x"
          ></img>
          <span className={classes.caption}>iPad</span>
        </div>

        <div className={classes.item}>
          <img
            className={classes.img}
            onClick={() => handleFilterProduct("Smart Watch")}
            width="200"
            height="130"
            alt=""
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-watch-nav-202203?wid=400&amp;hei=260&amp;fmt=png-alpha&amp;.v=1645052537409"
            srcSet="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-watch-nav-202203?wid=200&amp;hei=130&amp;fmt=png-alpha&amp;.v=1645052537409, https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-watch-nav-202203?wid=400&amp;hei=260&amp;fmt=png-alpha&amp;.v=1645052537409 2x"
          ></img>
          <span className={classes.caption}>Watch</span>
        </div>

        <div className={classes.item}>
          <img
            className={classes.img}
            onClick={() => handleFilterProduct("Airpods")}
            width="200"
            height="130"
            alt=""
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-airpods-nav-202110?wid=400&amp;hei=260&amp;fmt=png-alpha&amp;.v=1633718741000"
            srcSet="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-airpods-nav-202110?wid=200&amp;hei=130&amp;fmt=png-alpha&amp;.v=1633718741000, https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-airpods-nav-202110?wid=400&amp;hei=260&amp;fmt=png-alpha&amp;.v=1633718741000 2x"
          ></img>
          <span className={classes.caption}>Airpods</span>
        </div>

        <div className={classes.item}>
          <img
            className={classes.img}
            onClick={() => handleFilterProduct("Accessories")}
            width="200"
            height="130"
            alt=""
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-airtags-nav-202108?wid=400&amp;hei=260&amp;fmt=png-alpha&amp;.v=1625783380000"
            srcSet="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-airtags-nav-202108?wid=200&amp;hei=130&amp;fmt=png-alpha&amp;.v=1625783380000, https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-airtags-nav-202108?wid=400&amp;hei=260&amp;fmt=png-alpha&amp;.v=1625783380000 2x"
          ></img>
          <span className={classes.caption_accessories}>Accessories</span>
        </div>

        <div className={classes.item}>
          <img
            className={classes.img}
            onClick={() => handleFilterProduct("All")}
            width="200"
            height="130"
            alt=""
            src="https://icon-library.com/images/products-icon/products-icon-26.jpg"
          ></img>
          <span className={classes.caption_accessories}>All Products</span>
        </div>
      </div>

      <main className={classes.content}>
        <div></div>
        <div className={classes.toolbar} />
        <Grid container justify="center" spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Product
                product={product}
                onAddToCart={onAddToCart}
                OnResultProduct={onDetailProduct}
                filterCategory={handleFilterCategory}
              />
            </Grid>
          ))}
        </Grid>
      </main>
    </div>
  );
};

export default Products;
