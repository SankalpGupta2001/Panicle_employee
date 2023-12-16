import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const PositionDepartmentChart = () => {
    const chartContainer = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/employees');
                const employees = response.data.emp;

                const positionCounts = {};
                employees.forEach(employee => {
                    if (!positionCounts[employee.position]) {
                        positionCounts[employee.position] = 1;
                    } else {
                        positionCounts[employee.position]++;
                    }
                });

                const positionLabels = Object.keys(positionCounts);
                const positionData = positionLabels.map(label => positionCounts[label]);

                //This is line chart implementation
                new Chart(chartContainer.current, {
                    type: 'line',
                    data: {
                        labels: positionLabels,
                        datasets: [
                            {
                                label: 'Number of Employees vs Position',
                                data: positionData,
                                fill: false,
                                borderColor: 'rgba(75, 192, 192, 1)',
                                tension: 0.1,
                            },
                        ],
                    },
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="chart-container">
            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Number of Employees based on Position</h2>
            <canvas ref={chartContainer} width={400} height={400}></canvas>
        </div>
    );
};

export default PositionDepartmentChart;
