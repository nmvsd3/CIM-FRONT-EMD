import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewCrimes.css';

const ViewCrimes = () => {
  const [crimes, setCrimes] = useState([]);
  const [criminals, setCriminals] = useState([]);
  const [editCrime, setEditCrime] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [selectedSuspects, setSelectedSuspects] = useState([]);
  const [selectedSuspect, setSelectedSuspect] = useState(0);
  const [selectedCriminal, setSelectedCriminal] = useState(0);
  const [status, setStatus] = useState('Not Solved');
  const [error, setError] = useState(null);

 
  useEffect(() => {
    const fetchCrimes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/crimes');
        setCrimes(response.data || []); 
      } catch (error) {
        console.error('Error fetching crimes:', error);
        setError('Failed to fetch crimes.'); 
      }
    };

    const fetchCriminals = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/criminals/all');
        console.log('Criminals fetched:', response.data); 
        setCriminals(response.data || []); 
      } catch (error) {
        console.error('Error fetching criminals:', error);
        setError('Failed to fetch criminals.');
      }
    };

    fetchCrimes();
    fetchCriminals();
  }, []);

  const handleEditClick = (crime) => {
    setEditCrime(crime);
    setUpdatedDescription(crime.description || '');
    setSelectedSuspects(crime.suspects || []);
    setSelectedSuspect(crime.criminalName || '');
    setStatus(crime.status || 'Not Solved');
  };

  const handleUpdateCrime = async () => {
    const updatedCrime = {
      ...editCrime,
      description: updatedDescription,
      suspects: selectedSuspects,
      criminalName: selectedSuspect,
      status: status,

    };

    try {
      await axios.post(`http://localhost:8080/api/crimes/${editCrime.id}`, {crimeId: editCrime.id, criminalId: Number.parseInt(selectedSuspect)});
      setCrimes((prevCrimes) =>
        prevCrimes.map((crime) => (crime.id === editCrime.id ? updatedCrime : crime))
      );
      setEditCrime(null);
    } catch (error) {
      console.error('Error updating crime:', error);
      setError('Failed to update crime.'); 
    }

    if(selectedCriminal !== null){
      try {
        await axios.post(`http://localhost:8080/api/crimes/${editCrime.id}/update`, {crimeId: editCrime.id, criminalId: Number.parseInt(selectedCriminal

        )});
        setCrimes((prevCrimes) =>
          prevCrimes.map((crime) => (crime.id === editCrime.id ? updatedCrime : crime))
        );
        setEditCrime(null);
      } catch (error) {
        console.error('Error updating crime:', error);
        setError('Failed to update crime.'); 
      }
    }

    if(status == 'Solved'){
      try {
        await axios.post(`http://localhost:8080/api/crimes/${editCrime.id}/status`, {crimeId: editCrime.id, crimestatus: status

         });
        setCrimes((prevCrimes) =>
          prevCrimes.map((crime) => (crime.id === editCrime.id ? updatedCrime : crime))
        );
        setEditCrime(null);
      } catch (error) {
        console.error('Error updating crime:', error);
        setError('Failed to update crime.'); 
      }
    }
  };

  const handleSuspectsChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedSuspects(selectedOptions);
  };

  return (
    <div className="crime-view-container">
      <h2>Crime List</h2>
      {error && <p className="error-message">{error}</p>} {}
      <div className="crime-list-scrollable">
        {crimes.length > 0 ? (
          <table className="crime-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Place</th>
                <th>Type</th>
                <th>Description</th>
                <th>Convicted</th>
                <th>Suspects</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {crimes.map((crime) => (
                <tr key={crime.id}>
                  <td>{crime.date}</td>
                  <td>{crime.place}</td>
                  <td>{crime.type}</td>
                  <td>{crime.description}</td>
                  <td>{crime.criminals.length === 0  ? 'N/A' : crime.criminals.map(criminal =>(
                    <><span>{ criminal.statusCriminal == "Convicted" ?   criminal.name+",": ""}</span></>
                    ))}</td>
                  <td>{crime.criminals.length === 0  ? 'N/A' : crime.criminals.map(criminal =>(
                    <><span>{ criminal.statusCriminal == "Suspect" ?  criminal.name+"," : ""}</span></>
                    ))}</td>
                  <td>{crime.statusCrime}</td>
                  <td>
                    <button onClick={() => handleEditClick(crime)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No crimes added yet.</p>
        )}
      </div>

      {editCrime && (
        <div className="crime-edit-popup">
          <h3>Edit Crime</h3>
          <label>Attech a person as suspect</label>
          <select value={selectedSuspect} onChange={(e) => setSelectedSuspect(e.target.value)}>
            <option value="">Select Suspect</option>
            {criminals.map((criminal) => (
              <option key={criminal.name} value={criminal.id}>{criminal.name}</option>
            ))}
          </select>
          <label>Change suspect into criminal</label>
          <select value={selectedCriminal} onChange={(e) => setSelectedCriminal(e.target.value)}>
            <option value="">Select Criminal</option>
            {crimes.map((crime) => (
              // console.log(editCrime.id, crime.id)
             crime.id === editCrime.id ?
            crime.criminals.length === 0  ? 'N/A' : crime.criminals.map(criminal =>(
                    <>{ criminal.statusCriminal === "Suspect" ? <option key={criminal.name} value={criminal.id}>{criminal.name}</option> : ""}
                    
                    </>

                    ))  : ""
            ))} 
          </select>
          <label>Description</label>
          <textarea
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          <label>Suspects</label>
          <select multiple value={selectedSuspects} onChange={handleSuspectsChange}>
            {/* {criminals.map((criminal) => (
              <option key={criminal.name} value={criminal.name}>{criminal.name}</option>
            ))} */}
            {crimes.map((crime) => (
            crime.id === editCrime.id ?
            crime.criminals.length === 0  ? 'N/A' : crime.criminals.map(criminal =>(
                    <><option>{ criminal.statusCriminal == "Suspect" ?  criminal.name+"," : ""}</option></>
                    )) : "" ))} 
          </select>
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Solved">Solved</option>
            <option value="Not Solved">Not Solved</option>
          </select>
          <button onClick={handleUpdateCrime}>Update Crime</button>
          <button onClick={() => setEditCrime(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ViewCrimes;
