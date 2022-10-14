import React, { useState, useEffect } from "react";
import BarChart from "../Statistic/Barchart";
import { orderData } from "../Order/Chart/OrderData";
import LineChart from "../Statistic/LineChart";
const Chart = ({ ordStatistic, productStatistic }) => {
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
  return (
    <div style={{ height: "800px", width: "500px", marginTop: "100px" }}>
      <BarChart chartData={test} />

      <LineChart chartData={lineData} />
    </div>
  );
};

export default Chart;
