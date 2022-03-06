import React from 'react';
import { Card, Badge } from 'react-bootstrap'
import styled from 'styled-components';

const CaseCount = ({ caseType, caseCount, newCase, clsName }) => {

    const NewCases = () => {
        return newCase < 0 ? (newCase) : ('+' + newCase);
    }

    return (
        <>
            <CaseCountCard className={clsName}>
                <Card.Body style={{ padding: "1rem" }}>
                    <Card.Subtitle className="mb-2 text-muted">{caseType} Cases</Card.Subtitle>
                    <Card.Title as="h3">{caseCount}</Card.Title>
                    <Card.Text>
                        <Badge bg="light">{NewCases()}</Badge>
                    </Card.Text>
                </Card.Body>
            </CaseCountCard>
        </>
    )
}

export default CaseCount;

const CaseCountCard = styled(Card)`
  border-radius: .25rem;
  background: white;
  border: none;
  box-shadow: 0px 3px 5px rgb(0 0 0 / 5%);
`;
