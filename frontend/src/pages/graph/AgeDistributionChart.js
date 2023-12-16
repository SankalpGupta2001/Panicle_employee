import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const AgeDistributionChart = () => {
    const [chart, setChart] = useState(null);

    useEffect(() => {
        const getRandomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const generateRandomAges = (count) => {
            const ages = [];
            for (let i = 0; i < count; i++) {
                ages.push(getRandomInt(20, 80));
            }
            return ages;
        };

        const createAgeRanges = (ages) => {
            const ageRanges = [0, 0, 0, 0, 0, 0]; 
            ages.forEach((age) => {
                if (age >= 20 && age < 30) {
                    ageRanges[0]++;
                } else if (age >= 30 && age < 40) {
                    ageRanges[1]++;
                } else if (age >= 40 && age < 50) {
                    ageRanges[2]++;
                } else if (age >= 50 && age < 60) {
                    ageRanges[3]++;
                } else if (age >= 60 && age < 70) {
                    ageRanges[4]++;
                } else {
                    ageRanges[5]++;
                }
            });
            return ageRanges;
        };

        const ages = generateRandomAges(100); 
        const ageRanges = createAgeRanges(ages);

        const ctx = document.getElementById('ageChart');

        //This is bar chart implementation 
        const newChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['20-29', '30-39', '40-49', '50-59', '60-69', '70+'],
                datasets: [
                    {
                        label: 'Number of Employees',
                        data: ageRanges,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 159, 64, 0.5)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Employees',
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Age Ranges',
                        },
                    },
                },
            },
        });

        setChart(newChart);

        return () => {
            newChart.destroy(); 
        };
    }, []);


    return (<div className="chart-container" style={{ width: '80%', margin: 'auto' }}>
        <h2 style={{ textAlign: 'center' }}>Number of Employees based on Age Range</h2>
        <canvas id="ageChart" width="400" height="400"></canvas>;
    </div>);

};

export default AgeDistributionChart;
