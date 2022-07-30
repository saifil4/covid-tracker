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
import styled from 'styled-components';

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
                <LineChartCard>
                    <LineChartCardHeader>
                        <LineChartCardTitle>{title}</LineChartCardTitle>
                        <DurationDropDown value={duration} onChange={(e) => setDuration(e.target.value)}>
                            <option value={30}>Last 30 Days</option>
                            <option value={90}>Last 3 Months</option>
                            <option value={180}>Last 6 Months</option>
                            <option value={365}>Last 1 Year</option>
                        </DurationDropDown>
                    </LineChartCardHeader>
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
                </LineChartCard>

            )}
        </>

    )
}

export default LineChart;


const LineChartCard = styled.div`
  border-radius: .25rem;
  background: white;
  box-shadow: 0px 3px 5px rgb(0 0 0 / 5%);
`;

const LineChartCardHeader = styled.div`
    padding: 20px 15px;
    width: 100%;
`;

const LineChartCardTitle = styled.h5`
    display: inline-block;
`;

const DurationDropDown = styled.select`
    float: right;
    border-radius: 0.25rem;
    border: 1px solid;
    font-size: 14px;
    padding: 5px;
    color: black;
`
