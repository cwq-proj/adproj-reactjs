import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BinaryClassificationPlot = ({ title, trueLabel, falseLabel, trueLabelCount, falseLabelCount }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      const labels = [trueLabel, falseLabel];
      const values = [trueLabelCount, falseLabelCount];

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Binary Classification',
            data: values,
            backgroundColor: ['rgba(0, 123, 255, 0.6)', 'rgba(255, 99, 132, 0.6)'],
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
  }, [trueLabelCount]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default BinaryClassificationPlot;
