import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, PolarAreaController } from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, PolarAreaController);

export const PieChart = ({ data, labels }: any) => {
  return (
    <Pie
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
            display: false,
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