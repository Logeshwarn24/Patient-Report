import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend
);

const PatientLineChart = ({ patients }) => {
  const [chartData, setChartData] = useState({
    labels: [], // Time (dates)
    datasets: [
      {
        label: 'Age of Patients',
        data: [], // Patient ages corresponding to registration dates
        fill: false,
        borderColor: '#FF5733',
        tension: 0.1,
      },
    ],
  });

  // Function to process patients data and format it for the line chart
  const processData = () => {
    const sortedPatients = [...patients].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // Sort by created date

    const labels = sortedPatients.map((patient) => new Date(patient.createdAt).toLocaleDateString()); // X-axis: dates of registration
    const ages = sortedPatients.map((patient) => patient.age); // Y-axis: corresponding ages

    setChartData({
      labels, // X-axis: dates
      datasets: [
        {
          label: 'Age of Patients',
          data: ages, // Y-axis: patient ages
          fill: false,
          borderColor: '#FF5733',
          tension: 0.1,
        },
      ],
    });
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#333',
        },
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Date of Registration',
        },
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Age',
        },
        min: 0,
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
  };

  useEffect(() => {
    if (patients && patients.length > 0) {
      processData();
    }
  }, [patients]); // Re-run when patients data changes

  return (
    <div className="chart-container">
      <h2>Patient Age Over Time</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default PatientLineChart;
