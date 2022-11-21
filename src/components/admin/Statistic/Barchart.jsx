import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const option = {
  scales: {
    yAxes: [
      {
        ticks: {
          stepSize: 1,
        },
      },
    ],
  },
  showDatapoints: true,
};
const BarChart = ({ chartData }) => {
  return (
    <div>
      <Bar  data={chartData} options={option} />
    </div>
  );
};

export default BarChart;
