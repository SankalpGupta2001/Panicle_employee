import React from 'react';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import EmployeeDetails from './pages/EmployeeDetails';
import EmployeeDetail from './pages/EmployeeDetail';
import EmployeeUpdate from './pages/EmployeeUpdate';
import CreateEmployee from './pages/CreateEmployee'; 

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/employee-details" element={<EmployeeDetails />} />
        <Route path="/employee-detail/:id" element={<EmployeeDetail />} />
        <Route path="/employee-update/:id" element={<EmployeeUpdate />} />
        <Route path="/create-employee" element={<CreateEmployee />} /> 
      </Routes>
    </Router>
  );
};

export default App;
