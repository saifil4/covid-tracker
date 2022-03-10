import React, { useState, useEffect, useContext } from 'react';
import { useCountry } from '../store/SelectedCountryContext';
import LineChart from '../components/LineChart';
const VaccineCoverage = () => {

    const [vaccineData, setVaccineData] = useState();
    const {selectedCountry, setSelectedCountry} = useCountry();
    const [duration, setDuration] = useState(90);

    useEffect(() => {
        const url = selectedCountry === 'Worldwide' ? '' : 'countries/' + selectedCountry;
        const durationquery = '?lastdays=' + duration;
        fetch(`https://disease.sh/v3/covid-19/vaccine/coverage/${url}${durationquery}`)
            .then(res => res.json())
            .then(result => {
                var data = selectedCountry === 'Worldwide' ? result : result.timeline;
                setVaccineData(restructureData(data));
            })
    }, [selectedCountry, duration])

    const restructureData = (data) => {
        //1. Converting data in x,y format as required by charts.js
        //2. Editing data by subtracting the previous data from current 
        //   to get no of new cases on that day
        //3. Also converting Javascript Object to Array
        return Object.keys(data).map((key, index) => {
            return ({ x: (key), y: data[key] })
        });
    }

    return (
        <>
            <LineChart
                duration={duration}
                setDuration={setDuration}
                lineChartData={vaccineData}
                bgColor = "rgb(52, 152, 219,0.5)"
                borderColor ="#3498db"
                title="Vaccination Rate" />
        </>
    )
}

export default VaccineCoverage;