"use client";

import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface MeasurementResult {
  type: string;
  operationTimes: number;
}

interface PerformanceComparisonChartProps {
  data: {
    measurementResults: MeasurementResult[];
  };
}

export default function PerformanceComparisonChart({
  data,
}: PerformanceComparisonChartProps): React.JSX.Element {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const labels = data.measurementResults.map((item) =>
      item.type.toUpperCase(),
    );
    const operationTimes = data.measurementResults.map(
      (item) => item.operationTimes,
    );
    const purpleColor = "rgba(83, 91, 242, 1)";
    const yellowColor = "rgba(242, 191, 82, 1)";
    const backgroundColors = {
      js: yellowColor,
      wasm: purpleColor,
    };

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "operations per second (higher is better)",
          data: operationTimes,
          backgroundColor: Object.values(backgroundColors),
        },
      ],
    };

    const options = {
      indexAxis: "y" as const,
      scales: {
        x: {
          beginAtZero: true,
          grid: {
            color: "rgba(255, 255, 255, 0.2)",
          },
          ticks: {
            color: "#fff",
          },
        },
        y: {
          grid: {
            color: "rgba(255, 255, 255, 0.2)",
          },
          ticks: {
            color: "#fff",
            padding: 10,
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "top" as const,
          labels: {
            color: "#fff",
            font: {
              size: 14,
            },
            boxWidth: 0,
            boxHeight: 0,
          },
        },
      },
      backgroundColor: "rgba(0, 0, 0, 0)",
    };

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: "bar",
      data: chartData,
      options: options,
    });

    function handleChartResize() {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.resize();
      }
    }

    window.addEventListener("resize", handleChartResize);

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      window.removeEventListener("resize", handleChartResize);
    };
  }, [data]);

  return <canvas ref={chartRef} />;
}
