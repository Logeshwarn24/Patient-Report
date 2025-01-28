import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// Pages & components
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import EditPatientPage from './components/EditPatientPage';
import ViewAllPatientsPage from './pages/ViewallPatientsPage';
import PatientsSearchPage from './pages/PatientsSearchPage';
import PatientDetails from './components/PatientDetails';
import Sidebar from './components/Sidebar'; // New Sidebar component
import PatientDoughnutChart from './components/PatientDoughnutChart';
import GenderAgeBarChart from './components/GenderAgeBarChart';
import PatientLineChart from './components/PatientLineChart';
import PatientRadarChart from './components/PatientRadarChart';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="app-layout">
      <BrowserRouter>
        {user && <Sidebar />} {/* Sidebar only visible when user is logged in */}
        <div className="main-content">
          <Navbar />
          <div className="pages">
            <Routes>
              <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
              <Route path="/view-all-patients" element={user ? <ViewAllPatientsPage /> : <Navigate to="/login" />} />
              <Route path="/patients/search" element={user ? <PatientsSearchPage /> : <Navigate to="/login" />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
              <Route path="/edit/:id" element={user ? <EditPatientPage /> : <Navigate to="/login" />} />
              <Route path="/patients/:id" element={user ? <PatientDetails /> : <Navigate to="/login" />} />
              <Route path="/chart/age" element={user ? <PatientDoughnutChart /> : <Navigate to="/login" />} />
              <Route path="/chart/gender" element={user ? <GenderAgeBarChart /> : <Navigate to="/login" />} />
              <Route path="/chart/datevsage" element={user ? <PatientLineChart /> : <Navigate to="/login" />} />
              <Route path="/chart/emergencyservice" element={user ? <PatientRadarChart /> : <Navigate to="/login" />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
