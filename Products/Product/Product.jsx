import React, { useRef, useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";

import { AddShoppingCart } from "@material-ui/icons";
import useStyles from "./styles";
import { Link } from "react-router-dom";
const Product = ({ product, onAddToCart, OnResultProduct, compareMode,filterCategory }) => {
  const classes = useStyles();
  

  const handleClick = () => {
    OnResultProduct(product);
  };



  function handleOnClick(event) {
    console.log(product.categories[0].name)
    console.log(event.target.checked)
    filterCategory(product.categories[0].name,event.target.checked)
  }

  const productID = product.id;
  const linkTo = "/detail/" + productID;
  return (
    <Card className={classes.root} onClick={handleClick}>
      <CardMedia
        className={classes.media}
        image={product.image.url}
        title={product.name}
        component={Link}
        to={linkTo}
        draggable="true"
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>

          <Typography variant="h5" gutterBottom>
            {product.price.formatted_with_symbol}
          </Typography>
        </div>

        {/* <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="body2"
          color="textSecondary"
        /> */}
      </CardContent>

      <CardActions disableSpacing className={classes.cardActions}>
        {compareMode === "true" ? (
          <input
            type="checkbox"
            defaultChecked={false}
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: "1",
              flexDirection: "row",
              height: "30px",
              width: "50px",
            }}
            onChange={(event) => handleOnClick(event)}
          />
        ) : (
          console.log()
        )}
        <IconButton
          aria-label="Add to Cart"
          color="primary"
          style={{ display:"block"}}
          onClick={() => onAddToCart(product.id, 1)}
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
