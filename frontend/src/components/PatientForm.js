import { useState } from 'react'
import { usePatientsContext } from '../hooks/usePatientsContext'
import { useAuthContext } from "../hooks/useAuthContext"
const PatientForm = () => {
  const { dispatch } = usePatientsContext()
  const {user} = useAuthContext()
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('Male')
  const [place, setPlace] = useState('')
  const [disease, setDisease] = useState('')
  const [bloodgroup, SetBlood_Group] = useState(' ');
  const [specialist, setSpecialist] = useState('General')
  const [emergencyservice, setEmergencyService] = useState('No');
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      setError('You must be logged in')
      return
    }
    const Patient = {name, age, gender, place, disease, bloodgroup, specialist, height, weight, emergencyservice}
    
    const response = await fetch('/api/patients', {
      method: 'POST',
      body: JSON.stringify(Patient),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      
      setError(null)
      setName('')
      setAge('')
      setGender('')
      setPlace('')
      setDisease('')
      SetBlood_Group('')
      setSpecialist('')
      setWeight('')
      setHeight('')
      setEmergencyService('')
      console.log('new patient added', json)
      dispatch({type: 'CREATE_PATIENT', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Patient</h3>

      <label>Patient Name: </label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
        placeholder='Enter the patient name'
      />
      <label>Patient Age: </label>
      <input 
        type="number" 
        onChange={(e) => setAge(e.target.value)} 
        value={age}
        className={emptyFields.includes('age') ? 'error' : ''}
        placeholder='Enter the patient age'
      />      
      
      <label>Patient Gender</label>
      <select
        name="gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className={emptyFields.includes('gender') ? 'error' : ''}
        placeholder='Enter the patient gender'
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select><br></br><br></br>
      
      <label>Patient Weight: </label>
      <input 
        type="number" 
        onChange={(e) => setWeight(e.target.value)} 
        value={weight}
        className={emptyFields.includes('weight') ? 'error' : ''}
        placeholder='Enter the patient weight'
      />      
      <label>Patient Height: </label>
      <input 
        type="number" 
        onChange={(e) => setHeight(e.target.value)} 
        value={height}
        className={emptyFields.includes('height') ? 'error' : ''}
        placeholder='Enter the patient height'
      />      
      <label>Emergency Service</label>
      <select
        name="emergencyservice"
        value={emergencyservice}
        onChange={(e) => setEmergencyService(e.target.value)}
        className={emptyFields.includes('emergencyservice') ? 'error' : ''}
        placeholder='Enter the patient emergencyservice'
      >
        <option value="No">NO</option>
        <option value="Yes, pre-arrival by bystander">Yes-pre-arrival by bystander</option>
        <option value="Yes, on-arrival by emergency service">Yes, on-arrival by emergency service</option>
      </select><br></br><br></br>
      <label>Patient Place: </label>
      <input 
        type="text" 
        onChange={(e) => setPlace(e.target.value)} 
        value={place}
        className={emptyFields.includes('place') ? 'error' : ''}
        placeholder='Enter the patient address'
      />
      <label>Patient Disease: </label>
      <input 
        type="text" 
        onChange={(e) => setDisease(e.target.value)} 
        value={disease}
        className={emptyFields.includes('disease') ? 'error' : ''}
        placeholder='Enter the patient disease'
      />
      
      <label>Blood_Group: </label>
      <input 
        type="text" 
        onChange={(e) => SetBlood_Group(e.target.value)} 
        value={bloodgroup}
        className={emptyFields.includes('bloodgroup') ? 'error' : ''}
        placeholder='Enter the patient bloodgroup'
      />
      <br></br>
      <label>Specialist</label>
      <select
        type='text'
        value={specialist}
        onChange={(e)=> setSpecialist(e.target.value)}
        className={emptyFields.includes('specialist') ? 'error' : ''}
        placeholder='Enter the specialist'
      >
        <option value="General">General</option>
        <option value="Cardiologist">Cardiologist</option>
        <option value="Dermatologist">Dermatologist</option>
        <option value="Endocrinologist ">Endocrinologist </option>
        <option value="Neurologist">Neurologist</option>
        <option value="Psychiatrist">Psychiatrist</option>
        <option value="Pediatrician">Pediatrician</option>
        <option value="Ophthalmologist">Ophthalmologist</option>
        <option value="Urologist">Urologist</option>
        <option value="Gastroenterologist">Gastroenterologist</option>
        <option value="Pulmonologist">Pulmonologist</option>
      </select>

      
      <br></br><br></br>
      <button>Add Patient</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default PatientForm