import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const SalaryRangeChart = () => {
    const chartContainer = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/employees');
                const salaries = response.data.emp.map(employee => employee.salary);

               
                const salaryRanges = [
                    { range: 'Less than 50K', min: 0, max: 50000 },
                    { range: '50K - 60K', min: 50000, max: 60000 },
                    { range: '60K - 70K', min: 60000, max: 70000 },
                    { range: '70K - 80K', min: 70000, max: 80000 },
                    { range: '80K - 90K', min: 80000, max: 90000 },
                    { range: 'Above 90K', min: 90000, max: Infinity },
                ];

                const employeesBySalaryRange = salaryRanges.map(range => {
                    const count = salaries.filter(salary => salary >= range.min && salary < range.max).length;
                    return { label: range.range, count: count };
                });

                const labels = employeesBySalaryRange.map(item => item.label);
                const data = employeesBySalaryRange.map(item => item.count);

                // This is Bar Chart implementation
                new Chart(chartContainer.current, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Number of Employees',
                            data: data,
                            backgroundColor: 'rgba(54, 162, 235, 0.5)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                        }],
                    },
                    options: {
                        scales: {
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
        <div className="chart-container" style={{ width:'80%', margin: 'auto' }}>
            <h2 style={{ textAlign: 'center' }}>Number of Employees with their Salary</h2>
            <canvas ref={chartContainer} width={300} height={300}></canvas>
        </div>

    );
};

export default SalaryRangeChart;
