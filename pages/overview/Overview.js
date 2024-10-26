import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './Overview.css';

const Overview = () => {
  const [totalCrimes, setTotalCrimes] = useState(0);
  const [solvedCrimes, setSolvedCrimes] = useState(0);
  const [unsolvedCrimes, setUnsolvedCrimes] = useState(0);
  const [monthlyCrimes, setMonthlyCrimes] = useState(0);
  const [totalCriminals, setTotalCriminals] = useState(0);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  // Function to fetch data from the server
  const fetchOverviewData = async () => {
    try {
      // Fetch crimes
      const crimeResponse = await axios.get('http://localhost:8080/api/crimes'); 
      const crimeData = crimeResponse.data || []; 

      // Fetch criminals
      const criminalResponse = await axios.get('http://localhost:8080/api/criminals/all'); 
      const criminalData = criminalResponse.data || [];

      // Update state with fetched data
      setTotalCrimes(crimeData.length);
      setTotalCriminals(criminalData.length);

      const solved = crimeData.filter(crime => crime.status === 'Solved').length; // Ensure the status string matches your backend
      const unsolved = crimeData.length - solved;

      const currentMonth = new Date().getMonth();
      const monthlyCount = crimeData.filter(crime => new Date(crime.date).getMonth() === currentMonth).length;

      setSolvedCrimes(solved);
      setUnsolvedCrimes(unsolved);
      setMonthlyCrimes(monthlyCount);
    } catch (error) {
      setError('Error fetching overview data.');
      console.error('There was an error fetching overview data!', error);
    }
  };

  // Call fetchOverviewData on component mount
  useEffect(() => {
    fetchOverviewData(); 
  }, []); 

  // Optional: Function to refresh data after adding or updating a crime or criminal
  const refreshData = () => {
    fetchOverviewData();
  };

  // Function to update crime status
  const handleUpdateCrimeStatus = async (crimeId, newStatus) => {
    try {
      await axios.post(`http://localhost:8080/api/crimes/${crimeId}`, { status: newStatus }); // Update the crime status
      refreshData(); // Refresh the overview data after updating the status
    } catch (error) {
      setError('Error updating crime status.');
      console.error('There was an error updating crime status!', error);
    }
  };

  return (
    <div className="overview-container">
      <h2>Overview</h2>
      {error && <p className="error">{error}</p>}
      <div className="stats">
        <div className="stat-item" onClick={() => navigate('/viewcriminals')}>
          <h3>Total Criminals</h3>
          <p>{totalCriminals}</p>
        </div>
        <div className="stat-item" onClick={() => navigate('/viewcrimes')}>
          <h3>Total Crimes</h3>
          <p>{totalCrimes}</p>
        </div>
        <div className="stat-item">
          <h3>Solved Crimes</h3>
          <p>{solvedCrimes}</p>
        </div>
        <div className="stat-item">
          <h3>Unsolved Crimes</h3>
          <p>{unsolvedCrimes}</p>
        </div>
        <div className="stat-item">
          <h3>Crimes This Month</h3>
          <p>{monthlyCrimes}</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
