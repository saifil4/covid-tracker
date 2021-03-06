import React, { useEffect } from 'react';
import { Card, Badge } from 'react-bootstrap'

const CaseCount = ({ caseType, caseCount, newCase, clsName }) => {

    const NewCases = () => {
        return newCase < 0 ? (newCase) : ('+' + newCase);
    }

    return (
        <>
            <Card className={clsName}>
                <Card.Body style={{ padding: "1rem" }}>
                    <Card.Subtitle className="mb-2 text-muted">{caseType} Cases</Card.Subtitle>
                    <Card.Title as="h3">{caseCount}</Card.Title>
                    <Card.Text>
                        <h5>
                            <Badge variant="light">{NewCases()}</Badge>
                        </h5>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default CaseCount;
