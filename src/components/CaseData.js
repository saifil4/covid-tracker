import React from 'react';
import CaseInfoCard from '../components/caseinfocard';
import { Col } from 'react-bootstrap';
const CaseData = ({caseData}) => {
    return (
        <>

            <Col md={3}>
                <CaseInfoCard
                    caseType="Total"
                    caseCount={caseData.cases}
                    newCase={caseData.todayCases}
                    clsName="case-wrapper total-cases" />
            </Col>
            <Col md={3}>
                <CaseInfoCard
                    caseType="Active"
                    caseCount={caseData.active}
                    newCase={caseData.todayCases - caseData.todayRecovered}
                    clsName="case-wrapper active-cases" />
            </Col>
            <Col md={3}>
                <CaseInfoCard
                    caseType="Recovered"
                    caseCount={caseData.recovered}
                    newCase={caseData.todayRecovered}
                    clsName="case-wrapper recovered-cases" />
            </Col>
            <Col md={3}>
                <CaseInfoCard
                    caseType="Fatal"
                    caseCount={caseData.deaths}
                    newCase={caseData.todayDeaths}
                    clsName="case-wrapper fatal-cases" />
            </Col>
        </>
    )
}

export default CaseData;