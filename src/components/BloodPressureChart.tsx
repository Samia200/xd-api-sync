import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface BloodPressureData {
  month: string;
  systolic: number;
  diastolic: number;
}

interface BloodPressureChartProps {
  data: BloodPressureData[];
}

export const BloodPressureChart = ({ data }: BloodPressureChartProps) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#374151',
        bodyColor: '#374151',
        borderColor: '#e5e7eb',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        min: 60,
        max: 180,
        grid: {
          color: '#f3f4f6',
        },
        border: {
          display: false,
        },
      },
    },
    elements: {
      point: {
        radius: 6,
        hoverRadius: 8,
      },
      line: {
        tension: 0.4,
      },
    },
  };

  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Systolic',
        data: data.map(item => item.systolic),
        borderColor: 'hsl(280, 60%, 65%)',
        backgroundColor: 'hsl(280, 60%, 65%)',
        pointBackgroundColor: 'hsl(280, 60%, 65%)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'Diastolic',
        data: data.map(item => item.diastolic),
        borderColor: 'hsl(175, 70%, 45%)',
        backgroundColor: 'hsl(175, 70%, 45%)',
        pointBackgroundColor: 'hsl(175, 70%, 45%)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  return (
    <div className="w-full h-[300px]">
      <Line options={options} data={chartData} />
    </div>
  );
};