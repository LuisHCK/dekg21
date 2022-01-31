import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

type TProps = {
    title: string
    value: number | string
    link: string
    linkLabel: string
}

const DashboardCardItem = ({ title, value, link, linkLabel }: TProps): React.ReactElement => {
    return (
        <Card className="text-center mb-4">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <h2>{value}</h2>
                <Button as={Link as any} variant="primary" to={link}>
                    {linkLabel}
                </Button>
            </Card.Body>
        </Card>
    )
}

export default DashboardCardItem
