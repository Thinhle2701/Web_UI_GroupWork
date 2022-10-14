import React, { useState } from "react";
import Modal from "react-modal";
import { Button } from "@material-ui/core";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
const OderDetail = ({ setModal, detailOrder, orderInfo }) => {
  console.log(orderInfo);
  const [buttonOne, setButtonOne] = useState("contained");
  const [buttonTwo, setButtonTwo] = useState("outlined");
  const [title, setTitle] = useState("Order Detail");
  const [modalType, setModalType] = useState("item");

  const handleClickItem = () => {
    if (modalType == "shipping") {
      setModalType("item");
      setButtonOne("contained");
      setButtonTwo("outlined");
      setTitle("Order Detail");
    }
    console.log(buttonOne);
  };

  const handleClickShipping = () => {
    if (modalType == "item") {
      setModalType("shipping");
      setButtonOne("outlined");
      setButtonTwo("contained");
      setTitle("Shipping Data");
    }
    console.log(buttonTwo);
  };
  const address =
    orderInfo.shippingData.address +
    "ward " +
    orderInfo.shippingData.ward +
    " dictrict " +
    orderInfo.shippingData.district +
    " city " +
    orderInfo.shippingData.city;
  return (
    <div>
      <div>
        <button
          style={{
            marginLeft: "auto",
            display: "flex",
            backgroundColor: "transparent",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            marginBottom: "-30px",
          }}
          onClick={() => setModal(false)}
        >
          X
        </button>
      </div>
      <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "30px" }}>
        {title}
      </p>

      <div>
        <div style={{ textAlign: "center" }}>
          {buttonOne == "outlined" ? (
            <Button
              variant="outlined"
              onClick={() => {
                handleClickItem();
              }}
            >
              Ordered Item
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{ backgroundColor: "black", color: "white" }}
              onClick={() => {
                handleClickItem();
              }}
            >
              Ordered Item
            </Button>
          )}

          {buttonTwo == "outlined" ? (
            <Button
              variant="outlined"
              onClick={() => {
                handleClickShipping();
              }}
            >
              Shipping Information
            </Button>
          ) : (
            <Button
              style={{ backgroundColor: "black", color: "white" }}
              variant="contained"
              onClick={() => {
                handleClickShipping();
              }}
            >
              Shipping Information
            </Button>
          )}
        </div>
        <div>
          {modalType == "item" ? (
            <>
              <List disablePadding>
                {detailOrder.line_items.map((item) => (
                  <div>
                    <ListItem key={item.product_name}>
                      <img
                        src={item.image.url}
                        style={{
                          height: "150px",
                          width: "200px",
                          marginRight: "10px",
                          marginLeft: "10px",
                        }}
                      ></img>
                      <ListItemText
                        style={{ fontSize: "30px" }}
                        primary={item.name}
                        secondary={`quantity : ${item.quantity} `}
                      />
                      <Typography variant="body2" fontSize="30px">
                        {item.line_total.formatted_with_symbol}
                      </Typography>
                    </ListItem>
                  </div>
                ))}
                <ListItem>
                  <ListItemText>
                    <p
                      style={{
                        fontSize: "40px",
                        color: "#3F51B5",
                        paddingLeft: "20px",
                        fontWeight: "700",
                      }}
                    >
                      Total:{" "}
                    </p>
                  </ListItemText>
                  <Typography
                    color="primary"
                    variant="subtitle1"
                    style={{ fontWeight: 700, fontSize: "40px" }}
                  >
                    {detailOrder.subtotal.formatted_with_symbol}
                  </Typography>
                </ListItem>
              </List>
            </>
          ) : (
            <div>
              {" "}
              <div>
                <div style={{ display: "flex" }}>
                  <p style={{ fontWeight: "bold" }}>Name: </p>
                  <p style={{ paddingLeft: "40px" }}>
                    {" "}
                    {orderInfo.shippingData.firstName}{" "}
                    {orderInfo.shippingData.lastName}
                  </p>
                </div>
                <hr></hr>
                <div style={{ display: "flex" }}>
                  <p style={{ fontWeight: "bold" }}>Phone: </p>
                  <p style={{ paddingLeft: "40px" }}>
                    {" "}
                    {orderInfo.shippingData.phone}
                  </p>
                </div>
                <hr></hr>
                <div style={{ display: "flex" }}>
                  <p style={{ fontWeight: "bold" }}>Email:</p>
                  <p style={{ paddingLeft: "40px" }}>
                    {" "}
                    {orderInfo.shippingData.email}
                  </p>
                </div>
              </div>
              <hr></hr>
              <div style={{ display: "flex" }}>
                <p style={{ fontWeight: "bold" }}>Address:</p>
                {/* <p style={{paddingLeft:"20px"}}> {address} </p> */}
                <div style={{ paddingLeft: "20px" }}>
                  <ul>
                    <li>
                      <div style={{ display: "flex" }}>
                        <p style={{ fontWeight: "bold" }}> Street: </p>
                        <p style={{ paddingLeft: "30px" }}>
                          {" "}
                          {orderInfo.shippingData.address}
                        </p>
                      </div>
                    </li>
                    <li>
                      <div style={{ display: "flex" }}>
                        <p style={{ fontWeight: "bold" }}> Ward: </p>
                        <p style={{ paddingLeft: "30px" }}>
                          {" "}
                          {orderInfo.shippingData.ward}
                        </p>
                      </div>
                    </li>
                    <li>
                      <div style={{ display: "flex" }}>
                        <p style={{ fontWeight: "bold" }}> District: </p>
                        <p style={{ paddingLeft: "20px" }}>
                          {" "}
                          {orderInfo.shippingData.district}
                        </p>
                      </div>
                    </li>
                    <li>
                      <div style={{ display: "flex" }}>
                        <p style={{ fontWeight: "bold" }}> City: </p>
                        <p style={{ paddingLeft: "40px" }}>
                          {" "}
                          {orderInfo.shippingData.city}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OderDetail;
