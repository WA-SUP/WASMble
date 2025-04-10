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
          label: "초당 최대 실행 횟수",
          data: operationTimes,
          backgroundColor: Object.values(backgroundColors),
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: "y" as const,
      scales: {
        x: {
          beginAtZero: true,
          grid: { color: "rgba(255, 255, 255, 0.2)" },
          ticks: { color: "#fff", maxTicksLimit: 5 },
        },
        y: {
          grid: { color: "rgba(255, 255, 255, 0.2)" },
          ticks: { color: "#fff", padding: 5, font: { size: 12 } },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "top" as const,
          labels: { color: "#fff", font: { size: 12 }, boxWidth: 0 },
        },
      },
      backgroundColor: "rgba(0, 0, 0, 0)",
    };

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: "bar",
      data: chartData,
      options: options,
    });

    window.addEventListener("resize", () => {
      chartInstanceRef.current?.resize();
    });

    return () => {
      chartInstanceRef.current?.destroy();
    };
  }, [data]);

  return (
    <canvas
      ref={chartRef}
      className="w-full h-full max-h-[400px] min-h-[250px] p-2 sm:p-4"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
