import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewCriminals.css';

const ViewCriminals = () => {
  const [criminals, setCriminals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [selectedCriminal, setSelectedCriminal] = useState(null);
  const [criminalCrimes, setCriminalCrimes] = useState([]);

  useEffect(() => {
    const fetchCriminals = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/criminals/all');
        setCriminals(response.data);
      } catch (error) {
        setError('Error fetching criminals data');
        console.error('There was an error fetching the criminals!', error);
      }
    };
    fetchCriminals();
  }, []);

  const filteredCriminals = criminals.filter((criminal) =>
    criminal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    criminal.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchCriminalCrimes = async (criminalId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/crimes?criminalId=${criminalId}`);
      setCriminalCrimes(response.data);
    } catch (error) {
      console.error('Error fetching criminal crimes:', error);
    }
  };

  const handleViewCrimes = (criminalId) => {
    fetchCriminalCrimes(criminalId);
    setSelectedCriminal(criminalId);
  };

  const closeModal = () => {
    setSelectedCriminal(null);
    setCriminalCrimes([]);
  };

  return (
    <div className="view-criminals-container">
      <h2>View Criminals</h2>

      <input
        type="text"
        placeholder="Search by name or address..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {error && <p className="error">{error}</p>}

      <div className="table-container">
        {filteredCriminals.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Identifying Mark</th>
                <th>Crime Area</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCriminals.map((criminal, index) => (
                <tr key={index}>
                  <td>
                    {criminal.photo ? (
                      <a href={`http://localhost:8080/uploads/${criminal.photo}`} target="_blank" rel="noopener noreferrer">
                        <img
                          src={`http://localhost:8080/uploads/${criminal.photo}`}
                          alt={criminal.name}
                          className="criminal-photo"
                        />
                      </a>
                    ) : (
                      'No Photo'
                    )}
                  </td>
                  <td>{criminal.name}</td>
                  <td>{criminal.age}</td>
                  <td>{criminal.gender}</td>
                  <td>{criminal.address}</td>
                  <td>{criminal.identifyingMark}</td>
                  <td>{criminal.crimeArea}</td>
                  <td>
                    <button onClick={() => handleViewCrimes(criminal.id)}>
                      <i className="fas fa-eye" aria-hidden="true"></i> View Crimes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No criminals to display.</p>
        )}
      </div>

      {selectedCriminal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Crimes associated with Criminal ID: {selectedCriminal}</h3>
            <button className="close" onClick={closeModal}>&times;</button>
            {criminalCrimes.length > 0 ? (
              <ul>
                {criminalCrimes.map((crime) => (
                  <li key={crime.id}>{crime.description} - {crime.date}</li>
                ))}
              </ul>
            ) : (
              <p>No crimes found for this criminal.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCriminals;
