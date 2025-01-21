// src/pages/ViewAllPatientsPage.js
import { usePatientsContext } from '../hooks/usePatientsContext';
import PatientList from '../components/PatientList';

const ViewAllPatientsPage = () => {
  const { Patients } = usePatientsContext();

  return (
    <div className="view-all-patients">
      <h2>All Patients</h2>
      {Patients && Patients.length > 0 ? (
        <PatientList patients={Patients} />
      ) : (
        <p>No patients found.</p>
      )}
    </div>
  );
};

export default ViewAllPatientsPage;
