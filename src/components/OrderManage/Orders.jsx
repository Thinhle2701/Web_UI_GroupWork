import React, { useState, useEffect } from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
import { commerce } from "../../lib/commerce";
import OrderItem from "./OrderItems/OrderItem";
import axios from "axios";
const Orders = ({ orderList, isLoading,urlAPI }) => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [orderState, setOrderState] = useState([{}]);
  const userInfo = "user";

  // useEffect(() => {
  //   const setLoading = async () => {
  //     await delay(100);
  //     setIsLoading(true);
  //     await delay(3000);
  //     setIsLoading(false);
  //   };
  //   setLoading();
  // }, [orderList]);

  console.log("order list user: ", orderList);

  const setValue = () => {
    console.log("hello");
  };

  return (
    <>
      {isLoading === true ? (
        <div style={{ textAlign: "center" }}>
          <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/6d391369321565.5b7d0d570e829.gif"></img>
        </div>
      ) : (
        <div>
          {orderList.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: "20%" }}>
              <p>You do not have any order</p>
            </div>
          ) : (
            <div>
              <Typography
                variant="h6"
                gutterBottom
                style={{
                  fontSize: "30px",
                  marginTop: "100px",
                  textAlign: "center",
                }}
              >
                Your Order
              </Typography>

              {orderList.map((ord) => (
                <div key={ord.orderID}>
                  <OrderItem
                    urlAPI={urlAPI}
                    ordID={ord.orderID}
                    orderItem={ord}
                    detail={ord.orderDetail}
                    userRole="user"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Orders;
