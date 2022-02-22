import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import VaccineCoverage from '../components/VaccineCoverage';
const Vaccine = () => {
    const [vaccineData, setVaccineData] = useState();

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/vaccine')
            .then(res => res.json())
            .then(result => {
                setVaccineData(result.data.filter(fil => fil.trialPhase !== 'Pre-clinical'));
            })
    }, [])

    return (
        <>
            {
                vaccineData
                    ?
                    <Container fluid>
                        <Row>
                            <Col md={4}>
                                <div style={{ height: "calc(100vh - 80px)", overflow: "auto" }} className="vaccine-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Vaccine</th>
                                                <th>Mechanism</th>
                                                {/* <th>Sponsors</th> */}
                                                <th style={{ width: "25%" }}>Phase</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                vaccineData.map(vd => (
                                                    <tr>
                                                        <td>{vd.candidate}</td>
                                                        <td>{vd.mechanism}</td>
                                                        {/* <td>{vd.sponsors}</td> */}
                                                        <td>{vd.trialPhase}</td>
                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                </div>

                            </Col>
                            <Col md={8}>
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
    )

}

export default Vaccine;