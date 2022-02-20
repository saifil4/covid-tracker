import React, { useState, useEffect, useContext } from 'react';
import { SelectedCountryContext } from '../store/SelectedCountryContext';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};



function TestLine() {
    const [lineChartData, setLineChartData] = useState();
    const [duration, setDuration] = useState(90);
    const [selectedCountry, setSelectedCountry] = useContext(SelectedCountryContext);

    const FetchAllHistoricalData = () => {
        const region = selectedCountry === "Worldwide" ? "all" : selectedCountry;
        const durationquery = '?lastdays=' + duration;
        fetch(`https://disease.sh/v3/covid-19/historical/${region}${durationquery}`)
            .then((res) => res.json())
            .then((result) => {
                var cases = (region === "all") ? result.cases : result.timeline.cases
                var chartdata = RestructureData(cases);
                console.log(chartdata);

                setLineChartData({
                    labels: chartdata.map(chart => chart.x),
                    datasets: [
                        {
                            id: 1,
                            label: '',
                            data: chartdata.map(chart => chart.y)
                        }
                    ]
                });
            });
    }

    useEffect(() => {
        FetchAllHistoricalData();
    }, [selectedCountry, duration])

    const RestructureData = (data) => {
        //1. Converting data in x,y format as required by charts.js
        //2. Editing data by subtracting the previous data from current 
        //   to get no of new cases on that day
        //3. Also converting Javascript Object to Array
        return Object.keys(data).map((key, index) => {
            var previouskey = Object.keys(data)[index - 1];
            return ({ x: (key), y: data[key] - data[previouskey] })
        });
    }

    // export const data = {
    //     labels,
    //     datasets: [
    //       {
    //         label: 'Dataset 1',
    //         data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    //         borderColor: 'rgb(255, 99, 132)',
    //         backgroundColor: 'rgba(255, 99, 132, 0.5)',
    //       },
    //       {
    //         label: 'Dataset 2',
    //         data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    //         borderColor: 'rgb(53, 162, 235)',
    //         backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //       },
    //     ],
    //   };

    return lineChartData ? <Line
        datasetIdKey='id'
        data={lineChartData}
    /> : <div>Loading</div>;
}

export default TestLine;
