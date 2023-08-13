import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ContinuousVariablesCard = ({ title, xdata, ycount }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      const data = {
        labels: xdata,
        datasets: [
          {
            label: title,
            data: ycount,
            backgroundColor: 'rgba(0, 123, 255, 0.6)',
            borderWidth: 1,
          },
        ],
      };

      const options = {
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: title,
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Count",
            },
          },
        },
      };

      const newChartInstance = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options,
      });

      chartInstanceRef.current = newChartInstance;
    }
  }, [xdata, ycount]);

  return (
    <>
      <canvas ref={chartRef} />
    </>
  );
};

export default ContinuousVariablesCard;
