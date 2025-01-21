import { useAuthContext } from "./useAuthContext"
import { usePatientsContext } from "./usePatientsContext"

export const useLogout = () => {
  const {dispatch} = useAuthContext()
  const {dispatch: PatientsDispatch} = usePatientsContext()
  const logout = () => {
    //remove the user storage
    localStorage.removeItem('user');
    //dispatch the logout indicated
    dispatch({type: 'LOGOUT'})
    PatientsDispatch({type: 'SET_PatientS', payload: null})
  }
  return {logout}
}

