import { Radar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const PatientRadarChart = ({ patients }) => {
  const [chartData, setChartData] = useState({
    labels: [], // Labels for Radar Chart (Emergency States)
    datasets: [
      {
        label: 'Patient Ages by Emergency State',
        data: [], // Average ages grouped by emergency states
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  });

  // Function to process patient data for the Radar Chart
  const processData = () => {
    // Group patients by `emergencyservice` states
    const emergencyGroups = patients.reduce((acc, patient) => {
      const state = patient.emergencyservice || 'No';
      if (!acc[state]) {
        acc[state] = { totalAge: 0, count: 0 };
      }
      acc[state].totalAge += patient.age || 0; // Sum up ages
      acc[state].count += 1; // Increment patient count
      return acc;
    }, {});

    // Generate labels (emergency states) and corresponding data (average ages)
    const labels = Object.keys(emergencyGroups);
    const data = labels.map((state) => {
      const { totalAge, count } = emergencyGroups[state];
      return count > 0 ? totalAge / count : 0; // Calculate average age
    });

    setChartData({
      labels, // Emergency states
      datasets: [
        {
          label: 'Average Age',
          data, // Average ages
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
        },
      ],
    });
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
      legend: {
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14,
          },
        },
      },
    },
    scales: {
      r: {
        ticks: {
          beginAtZero: true,
        },
        pointLabels: {
          font: {
            size: 14,
          },
        },
        title: {
          display: true,
          text: 'Emergency States vs Average Age',
        },
      },
    },
  };

  useEffect(() => {
    if (patients && patients.length > 0) {
      processData();
    }
  }, [patients]); // Re-run when patients data changes

  return (
    <div className="chart-container">
      <h2>Radar Chart: Patient Age by Emergency State</h2>
      <Radar data={chartData} options={chartOptions} />
    </div>
  );
};

export default PatientRadarChart;
