import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
import OrderItem from "../../OrderManage/OrderItems/OrderItem";
import { orderData } from "../Order/Chart/OrderData";
import axios from "axios";
const ManageOrder = ({
  orderList,
  isLoading,
  ordStatistic,
  setNumberConfirmORD,
  numberConfirmORD,
}) => {
  const [ordData, setOrdData] = useState({
    labels: ordStatistic.map((data) => data.month),
    datasets: [
      {
        label: "Number Order",
        data: ordStatistic.map((data) => data.numberOrder),
      },
    ],
  });

  const [type, setType] = useState("order");
  const [buttonOne, setButtonOne] = useState("contained");
  const [buttonTwo, setButtonTwo] = useState("outlined");

  console.log("is loading: ", isLoading);
  // console.log("statistic", ordStatistic);

  // const handleClickStatistic = () => {
  //   if (type == "order") {
  //     setType("statistic");
  //     setButtonOne("outlined");
  //     setButtonTwo("contained");
  //     setOrdData({
  //       labels: ordStatistic.map((data) => data.month),
  //       datasets: [
  //         {
  //           label: "Number Order",
  //           data: ordStatistic.map((data) => data.numberOrder),
  //           backgroundColor: [
  //             "rgba(75,192,192,1)",
  //             "#ecf0f1",
  //             "#5ABA7A",
  //             "#E09B2E",
  //           ],
  //         },
  //       ],
  //     });
  //   }
  // };
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
            <div style={{ textAlign: "center", marginTop: "100px" }}>
              <Typography
                variant="h6"
                gutterBottom
                style={{
                  fontSize: "30px",
                  textAlign: "center",
                }}
              >
                {type}
              </Typography>
              {orderList.map((ord) => (
                <div key={ord.orderID}>
                  <OrderItem
                    ordID={ord.orderID}
                    orderItem={ord}
                    detail={ord.orderDetail}
                    userRole="admin"
                    numberOrderConfirm={numberConfirmORD}
                    setOrderConfirm={setNumberConfirmORD}
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

export default ManageOrder;
