import { Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PatientDoughnutChart = ({patients}) => {
  const [chartData, setChartData] = useState({
    labels: ['Age 0-18', 'Age 19-35', 'Age 36-50', 'Age 51+'],
    datasets: [
      {
        label: 'Patients Age Distribution',
        data: [0, 0, 0, 0],
        backgroundColor: ['#FF5733', '#FFBD33', '#75FF33', '#33FF57'],
        borderWidth: 1,
      },
    ],
  });

  // Function to process patients data and calculate age distribution
  const processData = () => {
    const ageGroups = [0, 0, 0, 0]; // [Age 0-18, Age 19-35, Age 36-50, Age 51+]
    
    patients.forEach(patient => {
      const age = patient.age;

      if (age >= 0 && age <= 18) ageGroups[0]++;
      else if (age >= 19 && age <= 35) ageGroups[1]++;
      else if (age >= 36 && age <= 50) ageGroups[2]++;
      else if (age >= 51) ageGroups[3]++;
    });

    // Update the chartData state
    setChartData(prevData => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          data: ageGroups,
        },
      ],
    }));
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
        position: 'top', // You can change to 'right', 'bottom', etc.
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#333',
        },
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
  };
  useEffect(() => {
    // Only process data if we have patients
    if (patients && patients.length > 0) {
      processData();
    }
  }, [patients]); // Re-run when patients data changes

  return (
    <div className="chart-container">
      <h2>Patient Age Distribution</h2>
      <Doughnut data={chartData} options={chartOptions}/>
    </div>
  );
};

export default PatientDoughnutChart;
