import { isObject } from 'lodash'
import React, { useMemo } from 'react'
import { Button, Col, ListGroup, Modal, Row, Table } from 'react-bootstrap'
import { TMachinery } from 'types/machinery'
import { TMaintenanceRegister } from 'types/maintenance-register'
import { readFileAsB64 } from 'utils/storage'
import styles from './styles.module.scss'

type TProps = {
    show: boolean
    register?: TMaintenanceRegister
    onClose?: () => void
}

const MaintenanceRegisterDetails = ({ show, onClose, register }: TProps): React.ReactElement => {
    const machine: TMachinery | undefined =
        typeof register?.machine === 'object' ? register.machine : undefined

    const activities = useMemo(() => {
        if (register?.activities) {
            return register.activities.split('\n').filter((activity) => !!activity.length)
        }

        return []
    }, [register])

    return (
        <Modal show={show} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{machine?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col xs={12} sm={6}>
                        <h4>Descripcion</h4>
                        <p>{machine?.description}</p>
                    </Col>
                    <Col xs={12} sm={6}>
                        <img
                            className="img-fluid"
                            src={isObject(machine?.photo) ? readFileAsB64(machine?.photo.path) : ''}
                            alt={machine?.name}
                        />
                    </Col>
                </Row>

                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Fecha de creacion</th>
                            <th>Frecuencia</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{register?.date}</td>
                            <td>{register?.frequency} días</td>
                        </tr>
                    </tbody>
                </Table>

                <Row>
                    <Col xs={12} md={6}>
                        <div className={styles.tableContainer}>
                            <Table striped hover size="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Proximas fechas</th>
                                        <th>Estado</th>
                                        <th>Orden</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {register?.expectedDates.map((date, index) => (
                                        <tr key={`register-date-${date}`}>
                                            <td>{index + 1}</td>
                                            <td>{date}</td>
                                            <td>--</td>
                                            <td>--</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Col>

                    <Col xs={12} md={6}>
                        <h4>Actividades</h4>

                        <ListGroup>
                            {activities.map((activity, index) => (
                                <ListGroup.Item key={`activity-${index}`}>
                                    {activity}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

MaintenanceRegisterDetails.defaultProps = {
    onClose: undefined,
    register: undefined,
}

export default MaintenanceRegisterDetails
