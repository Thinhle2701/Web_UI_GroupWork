import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
const ReviewForm = ({ cart,checkoutToken }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom style={{ fontSize: "30px" }}>
        Order {checkoutToken.id}
      </Typography>
      <List disablePadding>
        {checkoutToken.live.line_items.map((product) => (
          <ListItem key={product.name}>
            <img
              src={product.image.url}
              style={{
                height: "150px",
                width: "200px",
                marginRight: "10px",
                marginLeft: "10px",
              }}
            ></img>
            <ListItemText
              style={{ fontSize: "30px" }}
              primary={product.name}
              secondary={`quantity : ${product.quantity} `}
            />
            <Typography variant="body2" fontSize="30px">
              {product.line_total.formatted_with_symbol}
            </Typography>
          </ListItem>
        ))}

        <ListItem>
          <ListItemText>
            <p style={{ fontSize: "40px", color: "#3F51B5",paddingLeft:"20px",fontWeight:"700" }}>Total: </p>
          </ListItemText>
          <Typography
            color="primary"
            variant="subtitle1"
            style={{ fontWeight: 700, fontSize: "40px" }}
          >
            {checkoutToken.live.subtotal.formatted_with_symbol}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default ReviewForm;
