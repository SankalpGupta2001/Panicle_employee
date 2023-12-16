import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import Chart from 'chart.js/auto'; 
import DepartmentChart from './graph/DepartmentChartPieGraph';
import PositionDepartmentChart from './graph/PostionDepartmentChart';
import EmployeesSalaryRangeChart from './graph/EmployeeSalaryChart';
import { Link } from 'react-router-dom';
import "../App.css"

const LandingPage = () => {
    const [totalEmployees, setTotalEmployees] = useState(0);
    const [averageSalary, setAverageSalary] = useState(0);
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    //This is for searching
    const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const currentItems = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/employees');
                const emp = response.data.emp;

                const totalEmp = emp.length;

                const totalSalaries = emp.reduce((accumulator, currentEmp) => accumulator + currentEmp.salary, 0);
                const averageSalary = totalSalaries / totalEmp;

                setTotalEmployees(totalEmp);
                setAverageSalary(averageSalary);
                setEmployees(emp);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);




    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5rem' }}>

                    <div style={{
                        flex: '0 0 48%',
                        padding: '1rem',
                        background: 'linear-gradient(145deg, #d4d4d4, #ffffff)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                        textAlign: 'center'
                    }}>
                        <h1 style={{
                            textAlign: 'center',
                            marginBottom: '2rem',
                            textShadow: '0 0 8px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.8), 0 0 18px rgba(255, 255, 255, 0.8), 0 0 24px #ffffff, 0 0 36px #ffffff, 0 0 48px #ffffff, 0 0 66px #ffffff, 0 0 90px #ffffff',

                            border: '1px solid #ccc',
                            padding: '1rem',
                            borderRadius: '20px',
                            width: "95%",
                            margin: 'auto',
                            background: 'linear-gradient(145deg, #d4d4d4, #ffffff)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                        }}>
                            Welcome to Your Company Dashboard
                        </h1>


                        <div style={{ marginBottom: '1rem' }}>
                            <h2 style={{ textAlign: 'center' }}>Overview</h2>
                            <div style={{
                                border: '1px solid #ccc',
                                padding: '1rem',
                                borderRadius: '20px',
                                width: "50%",
                                margin: 'auto',
                                background: 'linear-gradient(145deg, #d4d4d4, #ffffff)',
                                backdropFilter: 'blur(8px)',
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                borderRadius: '10px',
                                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                            }}>
                                <p>Total Employees: {totalEmployees}</p>
                                <p>Average Salary: {averageSalary}</p>
                            </div>
                        </div>

                        <Link to="/employee-details" style={{ textDecoration: 'none', color: 'white' }}>
                            <button style={{ padding: '10px 20px', background: '#008CBA', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '10px' }}>Employee Details</button>
                        </Link>

                    </div>

                    <div style={{
                        flex: '0 0 48%',
                        padding: '1rem'
                    }}>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <DepartmentChart />
                        </div>
                    </div>


                </div>

                <hr style={{ width: '500px', marginBottom: '5rem' }} />
                {/* This is now graph  */}
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ flex: '0 0 48%', padding: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <PositionDepartmentChart />
                            </div>
                        </div>

                        <div style={{ flex: '0 0 48%', padding: '1rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <EmployeesSalaryRangeChart />
                            </div>
                        </div>
                    </div>
                </div>

                <hr style={{ width: '500px', marginBottom: '5rem' }} />

                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <h2>Search Employees By Name & Department</h2>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '50%', padding: '0.5rem', fontSize: '1rem', borderRadius: '20px', border: '1px solid #black' }}
                    />
                </div>

                {/* This is Employee List  */}

                <div style={{ flex: '0 0 100%', padding: '1rem', border: '1px solid white', borderRadius: '8px' }}>
                    <h2>Employee List</h2>
                    
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', height: '50vh', background: 'white' }}>
                        {currentItems.map((employee, index) => (
                            <div key={employee._id} style={{
                                border: '1px solid #ccc',
                                borderRadius: '20px',
                                padding: '2rem',
                                width: '20%', 
                                maxWidth: '200px',
                                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                transition: '0.3s',
                                borderRadius: '10px',
                                background: 'linear-gradient(145deg, #d4d4d4, #ffffff)',
                                backdropFilter: 'blur(8px)',
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                position: 'relative',
                                zIndex: '1',
                                margin: '0.5rem', 
                                flexBasis: 'calc(25% - 1rem)', 
                                flexGrow: index >= 6 ? 2 : 1,
                                flexShrink: 1,
                            }}>
                                <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>{employee.name}</h3>
                                <div style={{ marginBottom: '1rem' }}>
                                    <strong>Salary:</strong> {employee.salary}<br />
                                    <strong>Position:</strong> {employee.position}<br />
                                    <strong>Department:</strong> {employee.department}<br />
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {filteredEmployees.length > itemsPerPage && (
                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                            {Array(Math.ceil(filteredEmployees.length / itemsPerPage))
                                .fill()
                                .map((_, page) => (
                                    <button key={page + 1} onClick={() => setCurrentPage(page + 1)}
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
                                        {page + 1}
                                    </button>
                                ))}
                        </div>
                    )}
                </div>







            </div>
            <div style={{ textAlign: 'center', marginTop: '2rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
                <p>&copy; {new Date().getFullYear()} Your Company. All Rights Reserved.</p>
            </div>
        </div>







    );
};

export default LandingPage;
