import React from 'react';
import { Line } from 'react-chartjs-2';
import numeral from "numeral";
import { Col, DropdownButton, Dropdown } from 'react-bootstrap';

const LineChart = ({ lineChartData, duration, setDuration }) => {


    const options = {
        legend: {
            display: false,
        },
        elements: {
            point: {
                radius: 0,
            },
        },
        maintainAspectRatio: true,
        tooltips: {
            mode: "index",
            intersect: false,
            callbacks: {
                label: function (tooltipItem, data) {
                    return numeral(tooltipItem.value).format("+0,0");
                },
            },
        },
        scales: {
            xAxes: [
                {
                    type: "time",
                    time: {
                        format: "MM/DD/YY",
                        tooltipFormat: "ll",
                    },
                },
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values) {
                            return numeral(value).format("0a");
                        },
                    },
                },
            ],
        },
    };





    return (
        <>
            <Col md={9}>
                {lineChartData?.length > 0 && (
                    <div className="line-chart">
                        <div className="chart-header">
                            <h5 className="title">Daily new cases</h5>
                            <select className="duration-dropdown" value={duration} onChange={(e) => setDuration(e.target.value)}>
                                <option value={30}>Last 30 Days</option>
                                <option value={90}>Last 3 Months</option>
                                <option value={180}>Last 6 Months</option>
                                <option value={365}>Last 1 Year</option>
                            </select>
                        </div>
                        <Line
                            data={{
                                datasets: [
                                    {
                                        backgroundColor: "rgba(204, 16, 52, 0.5)",
                                        borderColor: "#CC1034",
                                        borderWidth: '2',
                                        borderJoinStyle: 'bevel',
                                        borderCapStyle: 'square',
                                        data: lineChartData,
                                    },
                                ],
                            }}
                            options={options}
                        />
                    </div>

                )}
            </Col>
        </>

    )
}

export default LineChart;