import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { AnalysisResult, DamageSeverity } from '../types/DamageTypes';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  results: AnalysisResult[];
}

export const DamageStats: React.FC<Props> = ({ results }) => {
  const stats = useMemo(() => {
    const counts = {
      [DamageSeverity.MINOR]: 0,
      [DamageSeverity.MODERATE]: 0,
      [DamageSeverity.SEVERE]: 0,
      [DamageSeverity.CATASTROPHIC]: 0,
    };

    results.forEach(result => {
      result.objects.forEach(obj => {
        counts[obj.severity]++;
      });
    });

    return counts;
  }, [results]);

  const chartData = {
    labels: Object.keys(stats),
    datasets: [
      {
        label: 'Damage Counts by Severity',
        data: Object.values(stats),
        backgroundColor: [
          'rgba(255, 206, 86, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
      },
    ],
  };

  return (
    <div className="mt-8 w-full max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Damage Analysis Statistics</h2>
      <Bar data={chartData} />
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-100 rounded">
          <h3 className="font-semibold">Total Objects Detected</h3>
          <p className="text-2xl">{Object.values(stats).reduce((a, b) => a + b, 0)}</p>
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <h3 className="font-semibold">Frames Analyzed</h3>
          <p className="text-2xl">{results.length}</p>
        </div>
      </div>
    </div>
  );
};