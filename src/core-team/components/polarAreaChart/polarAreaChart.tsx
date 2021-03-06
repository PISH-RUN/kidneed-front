import { PolarArea } from "react-chartjs-2";
import pattern from "patternomaly";
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, PolarAreaController } from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, PolarAreaController);

export const PolarAreaChart = ({ data, labels }: any) => {
  const bg = [
    [
      "rgba(30,116,253,0.5)",
      pattern.draw("diagonal", "rgba(30,116,253,0.5)"),
      "rgba(139,218,146,0.5)",
      pattern.draw("diagonal", "rgba(139,218,146,0.5)"),
      "rgba(255,131,69,0.5)",
      pattern.draw("diagonal", "rgba(255,131,69,0.5)"),
      "rgba(255,99,132,0.5)",
      pattern.draw("diagonal", "rgba(255,99,132,0.5)")
    ],
    [
      "rgba(30,116,253,0.5)",
      "rgba(139,218,146,0.5)",
      "rgba(255,131,69,0.5)",
      "rgba(255,99,132,0.5)"
    ]
  ];
  const border = [
    [
      "#1E74FD",
      "#1E74FD",
      "#8BDA92",
      "#8BDA92",
      "#FF8345",
      "#FF8345",
      "#FF6384",
      "#FF6384"
    ],
    [
      "#1E74FD",
      "#8BDA92",
      "#FF8345",
      "#FF6384"
    ]
  ];

  return (
    <PolarArea
      data={{
        datasets: [{
          data: data,
          backgroundColor: data?.length === 4 ? bg[1] : bg[0],
          borderColor: data?.length === 4 ? border[1] : border[0]
        }],
        labels: labels
      }}
      options={{
        responsive: true,
        scales: {
          radialLinear: {
            min: 0,
            max: 20
          }
        },
        plugins: {
          tooltip: {
            padding: 10,
            boxPadding: 4,
            rtl: true,
            titleFont: {
              family: "IRANSans"
            },
            bodyFont: {
              family: "IRANSans"
            }
          },
          legend: {
            display: false
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