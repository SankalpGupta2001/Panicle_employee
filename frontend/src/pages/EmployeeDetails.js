import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SalaryRangeChart from './graph/SalaryChart';
import AgeDistributionChart from './graph/AgeDistributionChart';


const EmployeeDetail = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(6);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees');
        //This logic i made to sort employee alphabetically
        const sortedEmployees = response.data.emp.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        setEmployees(sortedEmployees);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      const response = await axios.get('http://localhost:5000/api/employees');
      setEmployees(response.data.emp);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

 
  


  return (
    <div>
    <div>
      <div>
      <Link to="/" style={{ textDecoration: 'none', color: 'white' , float:'right'}}>
          <button style={{ padding: '10px 20px', background: '#008CBA', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '10px' }} >Go Back</button>
        </Link>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '100px' }}>
        <h2>Employee Details</h2>
        <Link to="/create-employee" style={{ textDecoration: 'none', color: 'white' }}>
          <button style={{ padding: '10px 20px', background: '#008CBA', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '10px' }}>Create New Employee</button>
        </Link>

        {/* This is table for employee details  */}

        <table style={{ borderCollapse: 'collapse', width: '90%', margin: 'auto' }}>
          <thead>
            <tr style={{ backgroundColor: '#ccc' }}>
              <th>S.no</th>
              <th>Name</th>
              <th>Department</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Update</th>
              <th>Delete</th>
              <th>Details</th>
            </tr>

          </thead>
          <tbody>
            {currentEmployees.map((employee, index) => (
           
              <tr key={employee._id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff', padding: '10px' }}>
                <td style={{ padding: '15px' }}>{index + 1}</td>
                <td style={{ padding: '15px' }}>{employee.name}</td>
                <td >{employee.department}</td>
                <td style={{ padding: '15px' }}>{employee.position}</td>
                <td style={{ padding: '15px' }}>{employee.salary}</td>
                <td style={{ padding: '15px' }}>
                  <Link to={`/employee-update/${employee._id}`}>
                    <button style={{ padding: '10px 20px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '5px' }}>
                      Update
                    </button>
                  </Link>
                </td>
                <td style={{ padding: '15px' }}>
                  <button onClick={() => handleDelete(employee._id)} style={{ padding: '15px', background: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '5px' }}>Delete</button>
                </td>
                <td style={{ padding: '15px' }}>
                  <button style={{ padding: '10px 20px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    <Link to={`/employee-detail/${employee._id}`} style={{ textDecoration: 'none', color: 'white' }}>Details</Link>
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ textAlign: 'center' }}>
          {employees.length > employeesPerPage &&
            Array(Math.ceil(employees.length / employeesPerPage))
              .fill()
              .map((_, index) => (
                <button key={index + 1} onClick={() => paginate(index + 1)}
                style={{
                  padding: '10px 20px',
                  margin: '5px',
                  fontSize: '1.2em',
                  borderRadius: '5px',
                  background: '#008CBA',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                }}
      
                >
                  {index + 1}
                </button>
              ))}
        </div>

      </div>
      <hr style={{ width: '500px', marginBottom: '5rem' }} />

      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: '0 0 48%', padding: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <AgeDistributionChart />
            </div>
          </div>

          <div style={{ flex: '0 0 48%', padding: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

              <SalaryRangeChart />

            </div>
          </div>
        </div>
      </div>

    </div>
    <div style={{ textAlign: 'center', marginTop: '2rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
    <p>&copy; {new Date().getFullYear()} Your Company. All Rights Reserved.</p>
</div>
</div>
  );
};

export default EmployeeDetail;
