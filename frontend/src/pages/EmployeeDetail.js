import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f5f5f5' }}>
    <div style={{ 
        border: '1px solid #ccc', 
        borderRadius: '20px', 
        padding: '2rem', 
        width: '50%', 
        maxWidth: '400px', 
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', 
        transition: '0.3s',
        borderRadius: '10px',
        background: 'linear-gradient(145deg, #d4d4d4, #ffffff)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        position: 'relative',
        zIndex: '1'
    }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Employee Details</h2>
        {employee ? (
            <div>
                <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>{employee.name}</h3>
                <div style={{ marginBottom: '1rem' }}>
                    <strong>Salary:</strong> {employee.salary}<br />
                    <strong>Position:</strong> {employee.position}<br />
                    <strong>Department:</strong> {employee.department}<br />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                    <Link to={`/employee-update/${id}`} style={{ marginRight: '1rem', padding: '8px 16px', background: '#008CBA', color: 'white', border: 'none', borderRadius: '5px', textDecoration: 'none' }}>Update</Link>
                    <button onClick={handleDelete} style={{ padding: '8px 16px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
                </div>
            </div>
        ) : (
            <p style={{ textAlign: 'center' }}>Loading...</p>
        )}
    </div>
    <div style={{ 
        position: 'absolute', 
        top: '-20px', 
        right: '-20px', 
        bottom: '-20px', 
        left: '-20px', 
        background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0))',
        borderRadius: '10px'
    }}></div>
</div>



  );
};

export default EmployeeDetail;
