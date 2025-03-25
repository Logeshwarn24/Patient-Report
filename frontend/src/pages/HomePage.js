import { useEffect, useState } from "react";
import { usePatientsContext } from "../hooks/usePatientsContext";
import { useAuthContext } from "../hooks/useAuthContext";
// components
import PatientForm from "../components/PatientForm";
const HomePage = () => {
  const { dispatch } = usePatientsContext(); // Get patients from context
  const { user } = useAuthContext(); // Get user from context
  const [isFormVisible, setIsFormVisible] = useState(false); // State to toggle the visibility of the form
  const api = process.env.BACKEND_URL

  // Fetch patients data when the page loads
  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch(`${api}/api/Patients`, {
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

  // Toggle the visibility of the PatientForm
  const handleAddPatientClick = () => {
    setIsFormVisible((prev) => !prev);
  };

  return (
    <div className="home">
      <div className="Patients">
        {/* Button to toggle PatientForm visibility */}
        <button onClick={handleAddPatientClick}>
          {isFormVisible ? 'Close Add Patient Form' : 'Add New Patient'}
        </button>

        {/* Conditionally render the PatientForm based on isFormVisible state */}
        {isFormVisible && <PatientForm />}
        <p className="theme">"To care for those who once cared for us is one of the highest honors."</p>
      </div>
    </div>
  );
};

export default HomePage;
