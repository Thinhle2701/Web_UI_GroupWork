import React, { useState, useRef, createRef } from "react";
import ReviewForm from "./ReviewForm";
import axios from "axios";
import emailjs from "@emailjs/browser";

import { Typography, Button, Divider, Checkbox } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ImageList } from "@mui/material";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const PaymentForm = ({
  cart,
  next,
  back,
  shippingData,
  checkoutToken,
  customer,
  refreshCart,
  city,
}) => {
  console.log(cart);
  console.log("shipping data", shippingData);
  const [checkCOD, setCheckCOD] = useState(true);
  const [checkCard, setCheckCard] = useState(false);
  const [img, setImg] = useState("");
  const ref = createRef(null);
  console.log("cod: ", checkCOD);
  console.log("card: ", !checkCOD);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes();
    const currentDate =
      `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}` +
      " " +
      time;
    var type_payment = "";
    console.log("user: ", customer);
    if (checkCOD === true) {
      type_payment = "COD";
    } else {
      type_payment = "Card";
    }

    await axios
      .post("http://localhost:8000/api/order//add_order_temp", {
        orderID: checkoutToken.id,
        customerID: customer.userID,
        total: checkoutToken.live.subtotal.formatted_with_symbol,
        paymentType: type_payment,
        shippingData: {
          firstName: shippingData.firstName,
          lastName: shippingData.lastName,
          email: shippingData.email,
          phone: shippingData.phone,
          city: city,
          district: shippingData.shippingDistrict,
          ward: shippingData.shippingWard,
          address: shippingData.address,
        },
        date: currentDate,
        status: "Wait To Confirm",
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    const name = shippingData.firstName + shippingData.lastName;
    emailjs.init("WnU7YjuW7qxqmeZng");
    emailjs
      .send("service_1rdwrdi", "template_qlzppko", {
        from_name: "Apple Store",
        user_name: name,
        ord_id: checkoutToken.id,
        user_email: shippingData.email,
        payment: type_payment,
        phone: shippingData.phone,
        address: shippingData.address,
      })
      .then(
        function () {
          console.log("SUCCESS!");
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );

    refreshCart();
  };


  return (
    <>
      <div ref={ref}>
        <ReviewForm cart={cart} checkoutToken={checkoutToken} />
      </div>
      <Divider />
      <div style={{ display: "flex" }}>
        <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
          Payment Method
        </Typography>
        <div
          style={{
            display: "flex",
            border: "2px solid blue",
            paddingRight: "50px",
            borderRadius: "20px",
            margin: "5px",
            marginLeft: "20%",
          }}
        >
          <input
            style={{
              width: "20px",
              height: "20px",
              margin: "25px",
              accentColor: "blue",
            }}
            type="checkbox"
            defaultChecked={true}
            checked={checkCOD}
            onChange={() => {
              setCheckCard(checkCOD);
              setCheckCOD(!checkCOD);
            }}
          />
          <div style={{ marginTop: "25px", display: "flex" }}>
            <img
              style={{ height: "20px", width: "20px" }}
              src="https://lzd-img-global.slatic.net/g/tps/tfs/TB1ZP8kM1T2gK0jSZFvXXXnFXXa-96-96.png_2200x2200q75.jpg_.webp"
            ></img>
            <p style={{ marginTop: "0px", paddingLeft: "5px" }}>
              Cash On Delivery
            </p>
          </div>
          <br />
        </div>

        <div
          style={{
            display: "flex",
            border: "2px solid green",
            paddingRight: "50px",
            borderRadius: "20px",
            margin: "5px",
            marginLeft: "20%",
          }}
        >
          <input
            style={{
              width: "20px",
              height: "20px",
              margin: "25px",
              accentColor: "green",
            }}
            type="checkbox"
            defaultChecked={false}
            checked={checkCard}
            onChange={() => {
              setCheckCOD(checkCard);
              setCheckCard(!checkCard);
            }}
          />
          <div style={{ marginTop: "25px", display: "flex" }}>
            <img
              style={{ height: "20px", width: "20px" }}
              src="https://lzd-img-global.slatic.net/g/tps/tfs/TB1Iey_osKfxu4jSZPfXXb3dXXa-96-96.png_2200x2200q75.jpg_.webp"
            ></img>
            <p
              style={{
                marginTop: "0px",
                paddingLeft: "5px",
                color: "green",
                fontWeight: "bold",
              }}
            >
              Payment Card
            </p>
          </div>
          <br />
        </div>
      </div>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form
              onSubmit={async (e) => {
                await handleSubmit(e);
                next();
              }}
            >
              {checkCard === true ? (
                <div>
                  <CardElement />
                  <br /> <br />{" "}
                </div>
              ) : (
                <div>
                  <p>you will recieve after</p>
                  <img src={img}></img>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={back}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  color="primary"
                >
                  Checkout
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
