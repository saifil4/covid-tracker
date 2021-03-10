import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Loading from '../components/Loading';
import LineChart from '../components/LineChart';
import CaseData from '../components/CaseData';
import { SelectedCountryContext } from '../store/SelectedCountryContext';

const Statistics = () => {
    const [lineChartData, setLineChartData] = useState();
    const [caseData, setCaseData] = useState();
    const [duration, setDuration] = useState(90);
    const [selectedCountry, setSelectedCountry] = useContext(SelectedCountryContext);

    const FetchAllCasesData = () => {
        const region = selectedCountry === "Worldwide" ? "all" : "countries/" + selectedCountry;
        fetch('https://disease.sh/v3/covid-19/' + region)
            .then(res => res.json())
            .then(result => {
                setCaseData(result);
            });
    }

    useEffect(() => {
        FetchAllCasesData();
    }, [selectedCountry])

    const FetchAllHistoricalData = () => {
        const region = selectedCountry === "Worldwide" ? "all" : selectedCountry;
        const durationquery = '?lastdays=' + duration;
        fetch(`https://disease.sh/v3/covid-19/historical/${region}${durationquery}`)
            .then((res) => res.json())
            .then((result) => {
                var cases = (region === "all") ? result.cases : result.timeline.cases
                var chartdata = RestructureData(cases);
                setLineChartData(chartdata);
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

    useEffect(() => {

    })
    return (
        <>
            {
                lineChartData && caseData
                    ?
                    <Container fluid>
                        <Row>
                            <CaseData caseData={caseData} />
                            <Col md={9}>
                                <LineChart
                                    duration={duration}
                                    setDuration={setDuration}
                                    lineChartData={lineChartData}
                                    title="Daily new cases" />
                            </Col>
                        </Row>
                    </Container>
                    :
                    <div className="loading-container">
                        <i style={{ fontSize: "30px" }} class="fas fa-circle-notch"></i>
                    </div>
            }

        </>
    );
}

export default Statistics;