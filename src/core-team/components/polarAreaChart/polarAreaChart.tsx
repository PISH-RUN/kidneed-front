import { PolarArea } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, PolarAreaController } from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, PolarAreaController);

export const PolarAreaChart = ({ data, labels }: any) => {
  return (
    <PolarArea
      data={{
        datasets: [{
          data: data,
          backgroundColor: ["rgba(30,116,253,0.5)", "rgba(139,218,146,0.5)", "rgba(255,131,69,0.5)", "rgba(255,99,132,0.5)"],
          borderColor: ["#1E74FD", "#8BDA92", "#FF8345", "#FF6384"]
        }],
        labels: labels
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top"
          },
          title: {
            display: true,
            text: "Chart.js Polar Area Chart"
          }
        }
      }}
    />
  );
};