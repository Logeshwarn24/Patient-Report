import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePatientsContext } from '../hooks/usePatientsContext';
import { useAuthContext } from "../hooks/useAuthContext";

const EditPatientPage = () => {
  const { id } = useParams(); // Retrieve the patient ID from the URL
  const { Patients, dispatch } = usePatientsContext(); // Get patients from context
  const { user } = useAuthContext(); // Get logged-in user
  const navigate = useNavigate(); // For navigation

  // States for the form
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [place, setPlace] = useState('');
  const [disease, setDisease] = useState('');
  const [bloodgroup, SetBlood_Group] = useState('');
  const [specialist, setSpecialist] = useState('General');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  // Load the patient data when editing
  useEffect(() => {
    const patientToEdit = Patients.find(patient => patient._id === id);
    if (patientToEdit) {
      setName(patientToEdit.name);
      setAge(patientToEdit.age);
      setGender(patientToEdit.gender);
      setPlace(patientToEdit.place);
      setDisease(patientToEdit.disease);
      SetBlood_Group(patientToEdit.bloodgroup);
      setSpecialist(patientToEdit.specialist);
    }
  }, [id, Patients]);

  // Handle the form submission (update patient)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    // Create a patient object
    const Patient = { name, age, gender, place, disease, bloodgroup, specialist };

    // Send the PATCH request to update the patient
    const response = await fetch(`/api/patients/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(Patient),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      dispatch({ type: 'UPDATE_PATIENT', payload: json });
      navigate(`/patients/${id}`); // Navigate to the patient details page after update
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Edit Patient</h3>

      <label>Patient Name: </label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>Patient Age: </label>
      <input
        type="number"
        onChange={(e) => setAge(e.target.value)}
        value={age}
        className={emptyFields.includes('age') ? 'error' : ''}
      />

      <label>Patient Gender: </label>
      <select
        name="gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className={emptyFields.includes('gender') ? 'error' : ''}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <label>Patient Place: </label>
      <input
        type="text"
        onChange={(e) => setPlace(e.target.value)}
        value={place}
        className={emptyFields.includes('place') ? 'error' : ''}
      />

      <label>Patient Disease: </label>
      <input
        type="text"
        onChange={(e) => setDisease(e.target.value)}
        value={disease}
        className={emptyFields.includes('disease') ? 'error' : ''}
      />

      <label>Blood Group: </label>
      <input
        type="text"
        onChange={(e) => SetBlood_Group(e.target.value)}
        value={bloodgroup}
        className={emptyFields.includes('bloodgroup') ? 'error' : ''}
      />

      <label>Specialist: </label>
      <select
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
        className={emptyFields.includes('specialist') ? 'error' : ''}
      >
        <option value="General">General</option>
        <option value="Cardiologist">Cardiologist</option>
        <option value="Dermatologist">Dermatologist</option>
        <option value="Endocrinologist">Endocrinologist</option>
        <option value="Neurologist">Neurologist</option>
        <option value="Psychiatrist">Psychiatrist</option>
        <option value="Pediatrician">Pediatrician</option>
        <option value="Ophthalmologist">Ophthalmologist</option>
        <option value="Urologist">Urologist</option>
        <option value="Gastroenterologist">Gastroenterologist</option>
        <option value="Pulmonologist">Pulmonologist</option>
      </select>

      <button>Update Patient</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default EditPatientPage;
