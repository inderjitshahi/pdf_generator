import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Logo from '../assets/logoMark.png';
import Printer from '../assets/printer.png';

const PDFGenerator = ({ chartRef }) => {
    const handlePrint = () => {
        if (!chartRef.current) {
            console.error('Chart reference is missing.');
            return;
        }

        // Capture chart as an image
        html2canvas(chartRef.current).then((canvas) => {
            const chartImage = canvas.toDataURL('image/png');

            // Create PDF
            const pdf = new jsPDF();

            // Set font styles
            pdf.setFont('Poppins', 'Bold'); // Set font family to Poppins
            pdf.setFontSize(9); // Set font size
            pdf.setLineHeightFactor(16 / 9); // Set line height factor

            /******************* Add Header *********************************/
            pdf.addImage(Logo, 'PNG', 10, 10, 8, 8);
            pdf.text('RealAssist.AI', 20, 15);
            pdf.text('123 Main Street, Dover, NH 03820-4667', 145, 15);

            // Add a line to separate header and chart
            pdf.line(10, 20, 200, 20);

            // Add chart title
            // pdf.text('Crime Statistics Chart', 75, 50);

            /************Main Content **************************************/
            pdf.addImage(chartImage, 'PNG', 10, 60, 190, 52);

            /************ Add Line Above Footer ********************************/
            pdf.line(10, 280, 200, 280); // Adjusted the y-coordinate

            /******************* Add Footer *********************************/
            const leftText = 'Report Generated on September 26, 2023';
            const rightText = 'RealAssist Property Report | Page 1 of 25';

            // Text on the left side of the footer
            pdf.setTextColor(20, 99, 255);
            pdf.text(leftText, 10, 285); // Adjusted the y-coordinate

            // Text on the right side of the footer
            pdf.setTextColor(9, 14, 36);
            pdf.text(rightText, 147, 285); // Adjusted the y-coordinate

            // Save the PDF
            pdf.save('crime_chart.pdf');
        });
    };

    return (
        <div className='flex justify-center'>
            <button onClick={handlePrint} className='flex press bg-[#090E24] text-white items-center px-5 py-3 gap-2 rounded-[16px] text-12px md:text-[14px]'>
                <img src={Printer} className='text-white' alt="Printer Icon" />
                <span className=''>Print</span>
            </button>
        </div>
    );
};

export default PDFGenerator;
