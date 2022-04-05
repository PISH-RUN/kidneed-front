import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, BarElement, Tooltip, PolarAreaController, CategoryScale } from "chart.js";

ChartJS.register(LinearScale, BarElement, Tooltip, PolarAreaController, CategoryScale);

export const BarChart = ({ data, labels }: any) => {
  return (
    <Bar
      data={{
        datasets: [{
          data: data,
          backgroundColor: ["#57ABF4", "#8BDA92", "#EF5DA8", "#FF6384"]
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