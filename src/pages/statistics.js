import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LineChart from '../components/LineChart';
import CaseData from '../components/CaseData';
import { SelectedCountryContext } from '../store/SelectedCountryContext';
import VaccineCoverage from '../components/VaccineCoverage';
import Navbar from '../components/Navbar';

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
        return Object.keys(data).map((key, index) => {
            var previouskey = Object.keys(data)[index - 1];
            return ({ x: (key), y: data[key] - data[previouskey] })
        });
    }

    return (
        <>
            <Navbar />
            {
                lineChartData && caseData
                    ?
                    <Container fluid className='py-2'>
                        <Row>
                            <Col md={12}>
                                <CaseData caseData={caseData} />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={6}>
                                <LineChart
                                    duration={duration}
                                    setDuration={setDuration}
                                    lineChartData={lineChartData}
                                    bgColor="rgba(231, 76, 60, 0.5)"
                                    borderColor="#CC1034"
                                    title="Daily new cases" />
                            </Col>
                            <Col md={6}>
                                <VaccineCoverage />
                            </Col>
                        </Row>
                    </Container>
                    :
                    <div className="loading-container">
                        <i style={{ fontSize: "30px" }} className="fas fa-circle-notch"></i>
                    </div>
            }

        </>
    );
}

export default Statistics;