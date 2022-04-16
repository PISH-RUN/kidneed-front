import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, BarElement, Tooltip, PolarAreaController, CategoryScale, Legend } from "chart.js";

ChartJS.register(LinearScale, BarElement, Tooltip, PolarAreaController, CategoryScale, Legend);

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
            ticks: {
              font: {
                family: "IRANSans",
              }
            }
          },
          y: {
            stacked: true
          }
        },
        plugins: {
          tooltip: {
            padding: 10,
            boxPadding: 4,
            rtl: true,
            titleFont: {
              family: "IRANSans",
            },
            bodyFont: {
              family: "IRANSans",
            }
          },
          legend: {
            position: "left",
            labels: {
              font: {
                family: "IRANSans",
              }
            }
          }
        }
      }}
    />
  );
};