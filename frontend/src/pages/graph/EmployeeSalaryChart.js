import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const EmployeesSalaryRangeChart = () => {
    const chartContainer = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/employees');
                const employees = response.data.emp;

                // Categorizing employees based on their positions and salary ranges
                const positions = ['Assistant', 'Junior Manager', 'Manager', 'Senior Manager'];
                const salaryRanges = ['Salary ≤ 50k', '50k < Salary ≤ 80k', '80k < Salary ≤ 100k', 'Salary > 100k'];

                const data = positions.map(position => {
                    const positionData = {};
                    salaryRanges.forEach(range => {
                        positionData[range] = employees.filter(emp =>
                            emp.position === position &&
                            ((range === 'Salary ≤ 50k' && emp.salary <= 50000) ||
                            (range === '50k < Salary ≤ 80k' && emp.salary > 50000 && emp.salary <= 80000) ||
                            (range === '80k < Salary ≤ 100k' && emp.salary > 80000 && emp.salary <= 100000) ||
                            (range === 'Salary > 100k' && emp.salary > 100000))
                        ).length;
                    });
                    return positionData;
                });

                const datasets = salaryRanges.map((range, index) => ({
                    label: range,
                    data: data.map(position => position[range]),
                    backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`,
                }));

                // This is bar chart implementation
                new Chart(chartContainer.current, {
                    type: 'bar',
                    data: {
                        labels: positions,
                        datasets: datasets,
                    },
                    options: {
                        scales: {
                            x: {
                                stacked: true,
                            },
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="chart-container" style={{ width: '400px', height: '600px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Number of Employee vs Salary Range  
            based on Position</h2>
            <canvas ref={chartContainer} width={100} height={100}></canvas>
        </div>
    );
};

export default EmployeesSalaryRangeChart;
