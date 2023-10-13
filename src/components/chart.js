import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import PDFGenerator from './PdfGenerator';

function MyChart({ crimeData }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const years = crimeData.map((entry) => entry.data_year);
        const burglaryData = crimeData.map((entry) => entry.Burglary);

        // Destroy the existing chart instance if it exists
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // Create a new chart instance
        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [{
                    label: "Burglary",
                    data: burglaryData,
                    borderColor: 'rgb(20, 99, 255)',
                    borderWidth: 2,
                    fill: false,
                }],
            },
        });

        // Clean up the chart when the component unmounts
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [crimeData]);


    return (
        <div className='space-y-10'>
            <PDFGenerator chartRef={chartRef} />
            <canvas ref={chartRef} ></canvas>
        </div>
    );
}

export default MyChart;
