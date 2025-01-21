import { createContext, useReducer } from 'react'

export const PatientsContext = createContext()

export const PatientsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PATIENTS':
      return { 
        Patients: action.payload 
      }
    case 'CREATE_PATIENT':
      return { 
        Patients: [action.payload, ...state.Patients] 
      }
    case 'DELETE_PATIENT':
      return { 
        Patients: state.Patients.filter(p => p._id !== action.payload._id) 
      }
    case 'UPDATE_PATIENT':
      return {
        ...state,
        Patients: state.Patients.map(patient =>
          patient._id === action.payload._id ? action.payload : patient
        ),
      };      
    default:
      return state
  }
}

export const PatientsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PatientsReducer, { 
    Patients: []
  })
  
  return (
    <PatientsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </PatientsContext.Provider>
  )
}