import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext'; // Import for authentication context

// Pages & components
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import EditPatientPage from './components/EditPatientPage'; // Assuming this is a page to edit a patient
import ViewAllPatientsPage from './pages/ViewallPatientsPage'; // View All Patients page
import PatientsSearchPage from './pages/PatientsSearchPage'; // Patients Search page
import PatientDetails from './components/PatientDetails'; // Patient Details page (view a specific patient)

function App() {
  const { user } = useAuthContext(); // Get the current logged-in user from context

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar /> {/* Navbar always displayed */}
        <div className="pages">
          <Routes>
            {/* Protected Routes */}
            <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/view-all-patients" element={user ? <ViewAllPatientsPage /> : <Navigate to="/login" />} />
            <Route path="/patients/search" element={user ? <PatientsSearchPage /> : <Navigate to="/login" />} />
            
            {/* Login and Signup Pages */}
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />

            {/* Edit Patient Page */}
            <Route path="/edit/:id" element={user ? <EditPatientPage /> : <Navigate to="/login" />} />

            {/* Patient Details Page */}
            <Route path="/patients/:id" element={user ? <PatientDetails /> : <Navigate to="/login" />} />

            {/* The View All Patients Page already renders the PatientList */}
            <Route path="/view-all-patients" element={user ? <ViewAllPatientsPage /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
