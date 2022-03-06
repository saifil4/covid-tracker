import React from 'react';
import CaseCount from './CaseCount';
import { Container, Row, Col } from 'react-bootstrap';
const CaseData = ({ caseData }) => {
    return (
        <>
            <Container fluid className="p-0">
                <Row>
                    <Col className="mb-1" md={3} xs="hidden">
                        <CaseCount
                            caseType="Total"
                            caseCount={caseData.cases}
                            newCase={caseData.todayCases}
                            clsName="case-wrapper total-cases" />
                    </Col>
                    <Col className="mb-1" md={3} xs={12}>
                        <CaseCount
                            caseType="Active"
                            caseCount={caseData.active}
                            newCase={caseData.todayCases - caseData.todayRecovered}
                            clsName="case-wrapper active-cases" />
                    </Col>
                    <Col className="mb-1" md={3} xs={12}>
                        <CaseCount
                            caseType="Recovered"
                            caseCount={caseData.recovered}
                            newCase={caseData.todayRecovered}
                            clsName="case-wrapper recovered-cases" />
                    </Col>
                    <Col className="mb-1" md={3} xs={12}>
                        <CaseCount
                            caseType="Fatal"
                            caseCount={caseData.deaths}
                            newCase={caseData.todayDeaths}
                            clsName="case-wrapper fatal-cases" />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CaseData;