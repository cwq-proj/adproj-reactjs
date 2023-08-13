import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const EducationClassificationPlot = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      const labels = ['Education Level 1', 'Education Level 2', 'Education Level 3', 'Education Level 4'];
      const values = [data[1], data[2], data[3], data[4]];

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Education Classification',
            data: values,
            backgroundColor: ['rgba(0, 123, 255, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(255, 205, 86, 0.6)'],
            borderWidth: 1,
          },
        ],
      };

      const options = {
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Count',
            },
          },
        },
      };

      const newChartInstance = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: options,
      });

      chartInstanceRef.current = newChartInstance;
    }
  }, [data]);

  return (
    <div>
      <h2>Education Classification Bar Plot</h2>
      <canvas ref={chartRef} />
    </div>
  );
};

export default EducationClassificationPlot;
