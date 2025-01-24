import { Link } from 'react-router-dom';

const PatientList = ({ patients }) => {
  return (
    <div className="patient-list">
      {patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        patients.map((patient) => (
          <div className="patient-item" key={patient._id}>
            <Link to={`/patients/${patient._id}`} className="view-details-btn">
              <h4>{patient.name}</h4>
              <p><strong>Age: </strong>{patient.age}</p>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default PatientList;
