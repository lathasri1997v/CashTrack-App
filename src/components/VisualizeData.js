import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VisualizeData = ({ transactions }) => {
  const categories = transactions.map(t => t.category);
  const amounts = transactions.map(t => t.amount);

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Transactions',
        data: amounts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="p-4">
      <h2 className="text-xl">Visualize Transactions</h2>
      <Bar data={data} />
    </div>
  );
};

export default VisualizeData;
