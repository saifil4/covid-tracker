import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

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
                            <Col>
                                <div className="vaccine-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Vaccine</th>
                                                <th>Mechanism</th>
                                                {/* <th>Sponsors</th> */}
                                                <th>Phase</th>
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
                            <Col>
                            </Col>
                        </Row>
                    </Container>

                    :
                    <div>Loading</div>
            }

        </>
    )

}

export default Vaccine;