import React, { useEffect, useState } from 'react';
import './DeleteCrimes.css';

const DeleteCrimes = () => {
  const [deletedCrimes, setDeletedCrimes] = useState([]);

  // Fetch deleted crimes from the backend
  useEffect(() => {
    fetch('http://localhost:8080/api/crimes/deleted')  // Ensure this endpoint fetches deleted crimes from backend
      .then(response => response.json())
      .then(data => setDeletedCrimes(data))
      .catch(error => console.error('Error fetching deleted crimes:', error));
  }, []); // Fetch the deleted crimes only when the component mounts

  // Function to clear all deleted crimes from the backend
  const clearAllDeletedCrimes = () => {
    fetch('http://localhost:8080/api/crimes/clearDeleted', {  // Adjust this endpoint based on your backend logic
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          setDeletedCrimes([]); // Clear the state after successful deletion
        } else {
          console.error('Failed to clear deleted crimes');
        }
      })
      .catch(error => console.error('Error clearing deleted crimes:', error));
  };

  return (
    <div className="delete-crimes-container">
      <h2>Deleted Crimes</h2>
      {deletedCrimes.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Place</th>
                <th>Type of Crime</th>
                <th>Victims</th>
                <th>Description</th>
                <th>Suspects</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {deletedCrimes.map((crime, index) => (
                <tr key={index}>
                  <td>{crime.date}</td>
                  <td>{crime.place}</td>
                  <td>{crime.crimeType}</td>
                  <td>{crime.victims}</td>
                  <td>{crime.description}</td>
                  <td>{crime.suspects}</td>
                  <td>{crime.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="clear-all-button" onClick={clearAllDeletedCrimes}>
            Clear All
          </button>
        </>
      ) : (
        <p>No deleted crimes to display.</p>
      )}
    </div>
  );
};

export default DeleteCrimes;
