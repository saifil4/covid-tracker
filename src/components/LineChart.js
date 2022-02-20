import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import numeral from "numeral";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const LineChart = ({ lineChartData, duration, setDuration, title, bgColor, borderColor }) => {


    // const options = {
    //     legend: {
    //         display: false,
    //     },
    //     elements: {
    //         point: {
    //             radius: 0,
    //         },
    //     },
    //     maintainAspectRatio: true,
    //     tooltips: {
    //         mode: "index",
    //         intersect: false,
    //         callbacks: {
    //             label: function (tooltipItem, data) {
    //                 return numeral(tooltipItem.value).format("+0,0");
    //             },
    //         },
    //     },
    //     scales: {
    //         xAxes: [
    //             {
    //                 type: "time",
    //                 time: {
    //                     format: "MM/DD/YY",
    //                     tooltipFormat: "ll",
    //                 },
    //             },
    //         ],
    //         yAxes: [
    //             {
    //                 gridLines: {
    //                     display: false,
    //                 },
    //                 ticks: {
    //                     // Include a dollar sign in the ticks
    //                     callback: function (value, index, values) {
    //                         return numeral(value).format("0a");
    //                     },
    //                 },
    //             },
    //         ],
    //     },
    // };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            filler: {
                propagate: true
            }
        },
    };




    return (
        <>
            {lineChartData?.length > 0 && (
                <div className="line-chart">
                    <div className="chart-header">
                        <h5 className="title">{title}</h5>
                        <select className="duration-dropdown" value={duration} onChange={(e) => setDuration(e.target.value)}>
                            <option value={30}>Last 30 Days</option>
                            <option value={90}>Last 3 Months</option>
                            <option value={180}>Last 6 Months</option>
                            <option value={365}>Last 1 Year</option>
                        </select>
                    </div>
                    <Line
                        data={{
                            labels: lineChartData.map(chart => chart.x),
                            datasets: [
                                {
                                    id: 1,
                                    label: '',
                                    fill: 'origin',
                                    backgroundColor: bgColor,
                                    borderColor: borderColor,
                                    data: lineChartData.map(chart => chart.y)
                                },
                            ]
                        }}
                        options={options}
                    />
                </div>

            )}
        </>

    )
}

export default LineChart;
