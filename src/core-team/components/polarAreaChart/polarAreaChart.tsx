import { PolarArea } from "react-chartjs-2";
import pattern from "patternomaly";
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, PolarAreaController } from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, PolarAreaController);

export const PolarAreaChart = ({ data, labels }: any) => {
  const bg = [
    [
      "rgba(30,116,253,0.5)",
      pattern.draw('diagonal', "rgba(30,116,253,0.5)"),
      "rgba(139,218,146,0.5)",
      pattern.draw('diagonal', "rgba(139,218,146,0.5)"),
      "rgba(255,131,69,0.5)",
      pattern.draw('diagonal', "rgba(255,131,69,0.5)"),
      "rgba(255,99,132,0.5)",
      pattern.draw('diagonal', "rgba(255,99,132,0.5)"),
    ]
  ];

  return (
    <PolarArea
      data={{
        datasets: [{
          data: data,
          backgroundColor: bg[0],
          borderColor: [
            "#1E74FD",
            "#1E74FD",
            "#8BDA92",
            "#8BDA92",
            "#FF8345",
            "#FF8345",
            "#FF6384",
            "#FF6384"
          ]
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