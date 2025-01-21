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
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      setError('You must be logged in')
      return
    }
    const Patient = {name, age, gender, place, disease, bloodgroup, specialist}
    
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
      />
      <label>Patient Age: </label>
      <input 
        type="number" 
        onChange={(e) => setAge(e.target.value)} 
        value={age}
        className={emptyFields.includes('age') ? 'error' : ''}
      />      
      
      <label>Patient Gender</label>
      <select
        name="gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className={emptyFields.includes('gender') ? 'error' : ''}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select><br></br><br></br>
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
      
      <label>Blood_Group: </label>
      <input 
        type="text" 
        onChange={(e) => SetBlood_Group(e.target.value)} 
        value={bloodgroup}
        className={emptyFields.includes('bloodgroup') ? 'error' : ''}
      />
      <br></br>
      <label>Specialist</label>
      <select
        type='text'
        value={specialist}
        onChange={(e)=> setSpecialist(e.target.value)}
        className={emptyFields.includes('specialist') ? 'error' : ''}
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