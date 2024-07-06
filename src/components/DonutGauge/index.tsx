import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const FullDonutGauge = ({ value, maxValue }) => {
    const data = {
        labels: ['Value', 'Remaining'],
        datasets: [
            {
                label: '# of Votes',
                data: [value, maxValue - value],
                backgroundColor: [
                    '#FFAA5B', 
                    '#F65D46'  
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        circumference: 360,
        rotation: 270,
        cutout: '80%', 
        plugins: {
            legend: {
                display: false 
            },
            tooltip: {
                enabled: false 
            }
        }
    };

    return (
        <div className='w-[140px] h-[140px]'>
            <Doughnut data={data} options={options} />
        </div>
    )
};

export default FullDonutGauge;
