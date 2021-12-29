import { ROUTER_PATHS } from 'app-constants/router-paths'
import BarChart from 'components/barchart'
import Calendar from 'components/calendar'
import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const DasboardPage = (): React.ReactElement => {
    return (
        <div className="w-100">
            <Row className="mt-4">
                <Col xs={12} md={6} lg={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Empleados registrados</Card.Title>
                            <h1>8</h1>
                            <Button // @ts-ignore
                                as={Link}
                                variant="primary"
                                to={ROUTER_PATHS.EMPLOYEES.ROOT}
                            >
                                Ir al listado
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} md={6} lg={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Maquinas registradas</Card.Title>
                            <h1>12</h1>
                            <Button // @ts-ignore
                                as={Link}
                                variant="primary"
                                to={ROUTER_PATHS.MACHINERY.ROOT}
                            >
                                Ir al listado
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} md={6} lg={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Órdenes de mantenimiento</Card.Title>
                            <h1>8</h1>
                            <Button
                                // @ts-ignore
                                as={Link}
                                to={ROUTER_PATHS.MAINTENANCE_REGISTER.ROOT}
                                variant="primary"
                            >
                                Ver todas
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col xs={12} sm={12}>
                    <BarChart />
                </Col>

                <Col xs={12} sm={12}>
                    <Calendar />
                </Col>
            </Row>
        </div>
    )
}

export default DasboardPage
