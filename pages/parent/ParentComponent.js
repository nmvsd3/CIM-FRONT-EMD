// ParentComponent.js
import React, { useState } from 'react';
import AddCrime from './AddCrime';
import ViewCriminals from './ViewCriminals';
import MapComponent from './MapComponent';

const ParentComponent = () => {
  const [crimeLocations, setCrimeLocations] = useState([]);

  const handleAddCrimeLocation = (location) => {
    setCrimeLocations((prev) => [...prev, location]);
  };

  return (
    <div>
      <AddCrime onAddCrime={handleAddCrimeLocation} />
      <ViewCriminals onAddCrimeLocation={handleAddCrimeLocation} />
      <MapComponent crimeLocations={crimeLocations} />
    </div>
  );
};

export default ParentComponent;
