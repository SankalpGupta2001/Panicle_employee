import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const DepartmentPieChart = () => {
    const chartContainer = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/employees');
                const employees = response.data.emp;

                const counts = employees.reduce((acc, employee) => {
                    acc[employee.department] = (acc[employee.department] || 0) + 1;
                    return acc;
                }, {});

                //This is pie chart implementation
                new Chart(chartContainer.current, {
                    type: 'pie',
                    data: {
                        labels: Object.keys(counts),
                        datasets: [{
                            data: Object.values(counts),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.5)',
                                'rgba(54, 162, 235, 0.5)',
                                
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                               
                            ],
                            borderWidth: 1,
                        }],
                    },
                    options: {
                        layout: {
                            padding: {
                                top: 100, 
                            },
                        },
                        radius: '80%',
                    },
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Number of Employees vs Department</h2>
            <canvas ref={chartContainer} width={100} height={100}></canvas>
        </div>
    );
};

export default DepartmentPieChart;
