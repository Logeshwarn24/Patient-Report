// src/pages/PatientsSearchPage.js
import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext'; // For authentication context
import PatientList from '../components/PatientList'; // Display patients in list format

const PatientsSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');  // Search query state
  const [patients, setPatients] = useState([]);        // Patients state to store search results
  const [error, setError] = useState(null);             // Error state to handle empty search results or failed fetch
  const [loading, setLoading] = useState(false);        // Loading state to show a spinner or loading message during fetch
  const { user } = useAuthContext(); // Get the current logged-in user
  //const navigate = useNavigate();

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);  // Update search query state
  };

  // Handle search form submission
  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setError('Please enter a patient name to search.');
      return;
    }

    setLoading(true);  // Set loading state to true when starting fetch

    try {
      const response = await fetch(`/api/patients/search?name=${searchQuery}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      const result = await response.json();

      if (response.ok) {
        setPatients(result);  // Update patients state with search results
        setError(null);        // Clear error if search is successful
      } else {
        setPatients([]);       // Clear patients state if no results are found
        setError('No patients found matching that name.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false); // Set loading state back to false after fetch
    }
  };

  return (
    <div className="patients-search-page">
      <h2>Search Patients</h2>

      {/* Search Form */}
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Type the name of patient..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {/* Loading state */}
      {loading && <p>Loading...</p>}

      {/* Error handling */}
      {error && <div className="error-message">{error}</div>}

      {/* Display search results */}
      <div className="patient-results">
        {patients.length > 0 ? (
          <PatientList patients={patients} />  /* Displaying patients in list format */
        ) : (
          <p>No patients found.</p>
        )}
      </div>
    </div>
  );
};

export default PatientsSearchPage;
