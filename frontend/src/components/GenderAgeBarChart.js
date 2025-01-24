import { Bar } from 'react-chartjs-2';
import { useEffect, useState, useCallback } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GenderAgeBarChart = ({ patients }) => {
  const [chartData, setChartData] = useState({
    labels: ['0-18', '19-35', '36-50', '51+'], // Age ranges for X-axis
    datasets: [
      {
        label: 'Male',
        data: [0, 0, 0, 0], // Male count for each age group
        backgroundColor: '#1E90FF', // Blue for Male
        borderColor: '#1E90FF',
        borderWidth: 1,
      },
      {
        label: 'Female',
        data: [0, 0, 0, 0], // Female count for each age group
        backgroundColor: '#FF69B4', // Pink for Female
        borderColor: '#FF69B4',
        borderWidth: 1,
      },
      {
        label: 'Other',
        data: [0, 0, 0, 0], // Count for Other genders
        backgroundColor: '#32CD32', // Green for Other
        borderColor: '#32CD32',
        borderWidth: 1,
      },
    ],
  });

  // Memoize the processData function with useCallback to prevent it from being recreated every render
  const processData = useCallback(() => {
    const maleCounts = [0, 0, 0, 0]; // Male counts for age groups
    const femaleCounts = [0, 0, 0, 0]; // Female counts for age groups
    const otherCounts = [0, 0, 0, 0]; // Other gender counts for age groups

    patients.forEach(patient => {
      const age = patient.age;
      const gender = patient.gender.toLowerCase();  // Ensure it's case-insensitive

      // Determine the age group and increment the corresponding gender count
      if (age >= 0 && age <= 18) {
        if (gender === 'male') maleCounts[0]++;
        else if (gender === 'female') femaleCounts[0]++;
        else otherCounts[0]++;
      } else if (age >= 19 && age <= 35) {
        if (gender === 'male') maleCounts[1]++;
        else if (gender === 'female') femaleCounts[1]++;
        else otherCounts[1]++;
      } else if (age >= 36 && age <= 50) {
        if (gender === 'male') maleCounts[2]++;
        else if (gender === 'female') femaleCounts[2]++;
        else otherCounts[2]++;
      } else if (age >= 51) {
        if (gender === 'male') maleCounts[3]++;
        else if (gender === 'female') femaleCounts[3]++;
        else otherCounts[3]++;
      }
    });

    // Update the chart data
    setChartData({
      labels: ['0-18', '19-35', '36-50', '51+'], // X-axis: Age groups
      datasets: [
        {
          label: 'Male',
          data: maleCounts, // Male counts for each age group
          backgroundColor: '#1E90FF',
          borderColor: '#1E90FF',
          borderWidth: 1,
        },
        {
          label: 'Female',
          data: femaleCounts, // Female counts for each age group
          backgroundColor: '#FF69B4',
          borderColor: '#FF69B4',
          borderWidth: 1,
        },
        {
          label: 'Other',
          data: otherCounts, // Other gender counts for each age group
          backgroundColor: '#32CD32', // Green for Other
          borderColor: '#32CD32',
          borderWidth: 1,
        },
      ],
    });
  }, [patients]); // Ensure this effect runs when `patients` change

  useEffect(() => {
    if (patients && patients.length > 0) {
      processData();
    }
  }, [patients, processData]); // Add `processData` here to avoid the warning

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
        title: {
          display: true,
          text: 'Age Groups',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Patients',
        },
        min: 0,
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
  };

  return (
    <div className="chart-container">
      <h2>Patient Gender Distribution by Age Group</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default GenderAgeBarChart;
