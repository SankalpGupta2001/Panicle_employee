import React, { useState } from 'react';

const CreateEmployee = () => {


  const [formData, setFormData] = useState({
    name: '',
    salary: '',
    position: '',
    department: '',
 
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/employees', {
      method: 'POST',
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
        console.error('Error creating employee:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div style={{ border: '1px solid #ccc', padding: '2rem', borderRadius: '20px', width: '50%', maxWidth: '500px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Create New Employee</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1rem' }}>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <label>Salary:</label>
                <input type="text" name="salary" value={formData.salary} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <label>Position:</label>
                <input type="text" name="position" value={formData.position} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <label>Department:</label>
                <input type="text" name="department" value={formData.department} onChange={handleInputChange} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
            </div>
            <button type="submit" style={{ width: '100%', padding: '10px 20px', background: '#008CBA', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Create</button>
        </form>
    </div>
</div>

  );
};

export default CreateEmployee;
