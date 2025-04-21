import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { TooltipItem } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type BarChartProps = {
  labels: string[];
  data: number[];
};

const BarChart: React.FC<BarChartProps> = ({ labels, data }) => {
  const [barColor, setBarColor] = useState<string>("rgba(75, 192, 192, 0.5)"); // Default color

  const updateBarColor = () => {
    // Create a temporary element with the `bg-primary` class to extract its computed color
    const tempElement = document.createElement("div");
    tempElement.className = "bg-primary";
    document.body.appendChild(tempElement);

    // Get the computed background color of the `bg-primary` class
    const computedColor = getComputedStyle(tempElement).backgroundColor;

    // Set the extracted color to the state
    setBarColor(computedColor);

    // Clean up the temporary element
    document.body.removeChild(tempElement);
  };

  useEffect(() => {
    // Initial color extraction
    updateBarColor();

    // Set up a MutationObserver to watch for changes in the <html> tag's attributes
    const observer = new MutationObserver(() => {
      updateBarColor(); // Update the bar color when the theme changes
    });

    // Observe the <html> element for attribute changes
    const htmlElement = document.documentElement;
    observer.observe(htmlElement, { attributes: true });

    // Cleanup the observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
  });

  const formattedLabels = labels.map((date) => {
    const parsedDate = new Date(date);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
    }).format(parsedDate);
  });

  const chartData = {
    labels: formattedLabels,
    datasets: [
      {
        label: "CPI Value",
        data, // Y-axis values
        backgroundColor: barColor, // Use the dynamically set color
        borderColor: barColor, // Optional: Use the same color for the border
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"bar">) {
            const value = context.raw as number;
            return `CPI: ${formatter.format(value)}`;
          },
        },
      },
    },
    scales: {
      y: {
        min: Math.min(...data) * 0.9,
        max: Math.max(...data) * 1.1,
        beginAtZero: true,
        ticks: {
          callback: function (value: number | string) {
            return formatter.format(Number(value));
          },
        },
        title: {
          display: true,
          text: "CPI",
        },
      },
    },
    legend: {
      display: true,
      position: "top" as const,
    },
    title: {
      display: true,
      text: "CPI by Month",
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
