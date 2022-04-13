import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, BarElement, Tooltip, PolarAreaController, CategoryScale } from "chart.js";

ChartJS.register(LinearScale, BarElement, Tooltip, PolarAreaController, CategoryScale);

const bg = [
  "#1890FF",
  "#8BDA92",
  "#FFC250",
  "#EF5DA8"
]

export const BarChart = ({ data, labels }: any) => {
  return (
    <Bar
      data={{
        datasets: data.map((items: any, index: number) => ({
          ...items,
          backgroundColor: bg[index],
        })),
        labels: labels
      }}
      options={{
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        },
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