import React, { useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';

const EmployeeUpdate = () => {
  const { id } = useParams(); 

  const [formData, setFormData] = useState({
    name: '',
    salary: '',
    position: '',
    department: '',
    
  });




  useEffect(() => {
    fetch(`http://localhost:5000/api/employees/${id}`)
      .then((response) => response.json())
      .then((data) => {
        
        setFormData(data); 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);


  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/api/employees/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        window.location="/employee-details";
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // The below code is the form to update user information

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div style={{ border: '1px solid #ccc', padding: '2rem', borderRadius: '20px', width: '50%', maxWidth: '500px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Update Employee Details</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1rem' }}>
                <label style={{ marginBottom: '5px' }}>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <label style={{ marginBottom: '5px' }}>Salary:</label>
                <input type="text" name="salary" value={formData.salary} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <label style={{ marginBottom: '5px' }}>Position:</label>
                <input type="text" name="position" value={formData.position} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <label style={{ marginBottom: '5px' }}>Department:</label>
                <input type="text" name="department" value={formData.department} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
            </div>
            <button type="submit" style={{ width: '100%', padding: '10px 20px', background: '#008CBA', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Update</button>
        </form>
    </div>
</div>

  );
};

export default EmployeeUpdate;
