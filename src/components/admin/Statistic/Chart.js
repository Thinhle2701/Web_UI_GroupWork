import React, { useState, useEffect } from "react";
import BarChart from "../Statistic/Barchart";
import { orderData } from "../Order/Chart/OrderData";
import LineChart from "../Statistic/LineChart";
const Chart = ({ ordStatistic, productStatistic }) => {
  const [highestProduct, setHighestProduct] = useState("");
  const [ordData, setOrdData] = useState({
    labels: ordStatistic.map((data) => data.month),
    datasets: [
      {
        label: "Number Order",
        data: ordStatistic.map((data) => data.numberOrder),
        backgroundColor: ["red", "green", "blue", "black"],
      },
    ],
  });
  const test = {
    labels: productStatistic.map((data) => data.name),
    datasets: [
      {
        label: "Number Quantity Sale",
        data: productStatistic.map((data) => data.numberOnSale),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Number Order",
        data: ordStatistic.map((data) => data.numberOrder),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  useEffect(() => {
    function maxProduct() {
      var max = 0;
      var highestName = "";
      for (let i = 0; i < productStatistic.length; i++) {
        if (productStatistic[i].numberOnSale > max) {
          max = productStatistic[i].numberOnSale;
          highestName = productStatistic[i].name;
        }
      }
      setHighestProduct(highestName);
    }
    maxProduct();
  }, [productStatistic]);
  // console.log("test statistic", productStatistic);
  return (
    <div style={{ height: "800px", width: "100%", marginTop: "100px" }}>
      {/* <h1 style={{ textAlign: "center" }}>Chart Statistic</h1> */}
      <div style={{ marginLeft: "25%", width: "50%" }}>
        <div style={{}}>
          <h2 style={{ textAlign: "center" }}>Number Product is Sold</h2>
          <BarChart chartData={test} />
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <img
          style={{ width: "150px", height: "100px", marginLeft: "30%" }}
          src="https://i.pinimg.com/originals/a8/54/f2/a854f2287274a36338bddd6cd82ad3ea.jpg"
        ></img>
        <div style={{ marginTop: "20px" }}>
          <p>The highest value : {highestProduct}</p>
        </div>
      </div>

      <div style={{ marginLeft: "25%", width: "50%", marginTop: "50px" }}>
        <div style={{}}>
          <h2 style={{ textAlign: "center" }}>Number Order </h2>
          <LineChart chartData={lineData} />
        </div>
      </div>
      {/* <div style={{ width: "60%" }}>
        <LineChart chartData={lineData} />
      </div> */}
    </div>
  );
};

export default Chart;
