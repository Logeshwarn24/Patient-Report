import { Link } from 'react-router-dom';
import { Home, Users, BarChart2, Search } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/">
              <Home size={20} /> Home
            </Link>
          </li>
          <li>
            <Link to="/view-all-patients">
              <Users size={20} /> View Patients
            </Link>
          </li>
          <li>
            <Link to="/patients/search">
              <Search size={20} /> Search Patients
            </Link>
          </li>
          <li>
            <Link to="/chart/age">
              <Users size={20} /> Age Patients
            </Link>
          </li>
          <li>
            <Link to="/chart/gender">
              <Users size={20} /> Gender Patients
            </Link>
          </li>
          <li>
            <Link to="/chart/emergencyservice">
              <Users size={20} /> EmergencyService Patients
            </Link>
          </li>
          <li>
            <Link to="/chart/datevsage">
              <Users size={20} /> Date Patients
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
