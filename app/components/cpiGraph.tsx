"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import BarChart from "./barChart";

// interface cpiData {
//   Results: {
//     series: {
//       data: { periodName: string; year: string; value: string }[];
//     }[];
//   };
// }

const CPIGraph: React.FC = () => {
  const [lastDates, setLastDates] = useState<string[]>([]);
  const [lastValues, setLastValues] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCPIValue = async () => {
    try {
      const response = await axios.post("/api/graphql", {
        query: `
          query {
            monthData {
              periodName
              year
              value
            }
          }
        `,
      });

      if (response.status !== 200 || response.data.errors) {
        console.error(
          "GraphQL Error:",
          response.data.errors || response.statusText
        );
        setError("Error fetching data");
        return;
      }

      const seriesData = response.data.data.monthData;

      if (Array.isArray(seriesData)) {
        const lastDates = seriesData.map(
          (entry: { periodName: string; year: string }) =>
            `${entry.periodName}, ${entry.year}`
        );
        const newValues = seriesData.map((entry: { value: string }) =>
          parseFloat(entry.value)
        );

        setLastDates(lastDates);
        setLastValues(newValues);
      }
    } catch (err) {
      console.error("Network Error:", err);
      setError("Error fetching data");
    }
  };

  useEffect(() => {
    fetchCPIValue();
    const interval = setInterval(fetchCPIValue, 240000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card mx-4 sm:mx-0 bg-base-100 shadow-sm transition-all duration-300 break-inside-avoid">
      <div className="card-body">
        <h3 className="inline-block mb-2 sm:mb-auto text-center sm:text-left card-title text-2xl">
          CPI By Month
        </h3>
        <div className="container mx-auto p-4">
          {error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <BarChart data={lastValues} labels={lastDates} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CPIGraph;
