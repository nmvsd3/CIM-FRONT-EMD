import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import AddCrime from "./pages/AddCrime/AddCrime";
import ViewCrimes from "./pages/ViewCrime/ViewCrimes";
import DeleteCrimes from "./pages/Delete/DeleteCrimes";
import AddCriminal from "./pages/Criminal/AddCriminal";
import ViewCriminals from "./pages/ViewCriminal/ViewCriminals";
import Overview from "./pages/overview/Overview";
import MapComponent from "./pages/Map/MapComponent";
import CriminalDetails from "./pages/CriminalDetails/CriminalDetails";
import LoginRegister from "./components/LoginRegister/LoginRegister"; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('auth') ? true : false;
  });
  const [userName, setUserName] = useState(''); // Store user's name here

  const handleLoginSuccess = (userId) => {
    setIsAuthenticated(true);
    setUserName(userId); // Set the police ID when logged in
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName(''); // Clear the user name on logout
  };

  return (
    <Router>
      <div className="App">
        {!isAuthenticated ? (
          <LoginRegister onLoginSuccess={handleLoginSuccess} />
        ) : (
          <>
            <Navbar userName={userName} onLogout={handleLogout} />
            <div className="container">
              <Sidebar />
              <div className="content">
                <Routes>
                  <Route exact path="/overview" element={<Overview />} />
                  <Route path="/addcrime" element={<AddCrime />} />
                  <Route path="/viewcrimes" element={<ViewCrimes />} />
                  <Route path="/addcriminal" element={<AddCriminal />} />
                  <Route path="/viewcriminals" element={<ViewCriminals />} />
                  <Route path="/delete" element={<DeleteCrimes />} />
                  <Route path="/criminal-details" element={<CriminalDetails />} />
                  <Route path="/map" element={<MapComponent />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
