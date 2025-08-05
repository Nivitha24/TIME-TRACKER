import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  data: { activity: string; hours: number; color: string }[];
}

const TimeChart: React.FC<Props> = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.activity),
    datasets: [
      {
        label: 'Hours',
        data: data.map((d) => d.hours),
        backgroundColor: data.map((d) => d.color),
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="bg-white p-3 rounded-lg shadow-inner w-full">
      <Pie data={chartData} />
    </div>
  );
};

export default TimeChart;
