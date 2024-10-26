import React, { useState } from 'react';
import './AddCrime.css';

const AddCrime = () => {
  const [date, setDate] = useState('');
  const [place, setPlace] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  const handleAddCrime = async () => {
    const newCrime = { date, place, type, description };

    const response = await fetch('http://localhost:8080/api/crimes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCrime),
    });

    if (response.ok) {
      alert('Crime has been added');
     
      window.location.href = '/ViewCrimes';
    } else {
      alert('Failed to add crime');
    }
  };

  return (
    <div className="add-crime-form-container">
      <h2>Add Crime</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleAddCrime(); }}>
        <label>Date of Crime:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

        <label>Place of Crime:</label>
        <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} required />

        <label>Type of Crime:</label>
        <select value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="">Select Crime Type</option>
          <option value="Theft">Theft</option>
          <option value="Assault">Assault</option>
          <option value="Fraud">Fraud</option>
          <option value="Murder">Murder</option>
        </select>

        <label>Detailed Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <button type="submit">Add Crime</button>
      </form>
    </div>
  );
};

export default AddCrime;
