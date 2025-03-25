import { usePatientsContext } from '../hooks/usePatientsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useParams } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Link } from 'react-router-dom';
const api = process.env.BACKEND_URL
const PatientDetails = () => {
  const { id } = useParams(); // Retrieve the patient ID from the URL
  const { Patients, dispatch } = usePatientsContext(); // Get patients from context
  const { user } = useAuthContext(); // Get the logged-in user

  // Find the patient with the matching ID
  const patient = Patients.find(patient => patient._id === id);

  if (!patient) {
    return <p>Patient not found.</p>;
  }

  const handleClick = async () => {
    if (!user) return;

    const response = await fetch(`${api}/api/patients/${patient._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_PATIENT', payload: json });
    }
  };

  return (
    <div className="Patient-details">
      <h4>Name: {patient.name}</h4>
      <p><strong>Age: </strong>{patient.age}</p>
      <p><strong>Gender: </strong>{patient.gender}</p>
      <p><strong>Patient Weight: </strong>{patient.weight} KG</p>
      <p><strong>Patient Height: </strong>{patient.height} CM</p>
      <p><strong>Emergency Service: </strong>{patient.emergencyservice || 'NO'}</p>
      <p><strong>Place: </strong>{patient.place}</p>
      <p><strong>Disease: </strong>{patient.disease}</p>
      <p><strong>Blood Group: </strong>{patient.bloodgroup}</p>
      <p><strong>Specialist: </strong>{patient.specialist || 'General'}</p>
      <p><strong>Registered: </strong>{formatDistanceToNow(new Date(patient.createdAt), { addSuffix: true })}</p>
      <button onClick={handleClick} className="delete-btn">Delete</button>
      <Link to={`/edit/${patient._id}`} className="edit-btn">Edit</Link>
    </div>
  );
};

export default PatientDetails;
