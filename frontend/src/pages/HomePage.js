// src/pages/HomePage.js
import { useEffect } from "react";
import { usePatientsContext } from "../hooks/usePatientsContext";
import { useAuthContext } from "../hooks/useAuthContext";
// components
import PatientForm from "../components/PatientForm";
import PatientDoughnutChart from "../components/PatientDoughnutChart";
import PatientLineChart from "../components/PatientLineChart";
//import PatientList from "../components/PatientList"; // Import PatientList to display all patients

const HomePage = () => {
  const { Patients, dispatch } = usePatientsContext(); // Get patients from context
  const { user } = useAuthContext(); // Get user from context

  // Fetch patients data when the page loads
  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch('/api/Patients', {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_PATIENTS', payload: json });
      }
    };

    if (user) {
      fetchPatients();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="Patients">
        <PatientForm /> {/* Form to add new patient */}
        {Patients && <PatientDoughnutChart patients={Patients} />} {/* Optional chart */}
        <PatientLineChart patients={Patients} />
      </div>
    </div>
  );
};

export default HomePage;
