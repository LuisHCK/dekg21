import React from 'react'
import moment from 'moment'
import { Button, Card, ListGroup, ListGroupItem, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { SELECT_WORK_ORDER_STATE } from 'store/selectors/work-order.selectors'
import { getAssetPath } from 'utils/services'
import styles from './styles.module.scss'
import Masonry from 'react-masonry-css'

type TWorkDetailsProps = {
    show?: boolean
    onClose?: () => void
}

const WorkOrderDetails = ({ show, onClose }: TWorkDetailsProps): React.ReactElement => {
    const { currentOrder } = useSelector(SELECT_WORK_ORDER_STATE)

    return (
        <Modal show={show} onHide={onClose} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Orden No. {currentOrder?.id}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Masonry
                    breakpointCols={{ default: 2, 780: 1 }}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    <Card>
                        <Card.Header className="app-card-header">Informacíon básica</Card.Header>

                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <b>Fecha: </b>
                                    {moment(currentOrder?.date).format('DD/MM/YYYY')}
                                </ListGroupItem>
                                <ListGroupItem>
                                    <b>Area/Planta: </b>
                                    {currentOrder?.area}
                                </ListGroupItem>
                                <ListGroupItem>
                                    <b>Tipo: </b>
                                    {currentOrder?.type === 'corrective'
                                        ? 'Correctivo'
                                        : 'Preventivo'}
                                </ListGroupItem>
                                <ListGroupItem>
                                    <b>Descripción: </b>
                                    <p className={styles.paragraph}>{currentOrder?.description}</p>
                                </ListGroupItem>
                            </ListGroup>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header className="app-card-header">Máquina</Card.Header>

                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <b>Nombre: </b>
                                    {currentOrder?.machine.name}
                                </ListGroupItem>
                                <ListGroupItem>
                                    <b>Marca: </b>
                                    {currentOrder?.machine.brand}
                                </ListGroupItem>
                                <ListGroupItem>
                                    <img
                                        className="img-thumbnail"
                                        src={getAssetPath(currentOrder?.machine.photo?.url)}
                                        alt="machine"
                                    />
                                </ListGroupItem>
                            </ListGroup>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header className="app-card-header">Técnico</Card.Header>

                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <b>Nombre: </b>
                                    {currentOrder?.employee.firstName}{' '}
                                    {currentOrder?.employee.lastName}
                                </ListGroupItem>
                                <ListGroupItem>
                                    <b>Cargo: </b>
                                    {currentOrder?.employee.role}
                                </ListGroupItem>
                            </ListGroup>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header className="app-card-header">Costo</Card.Header>

                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <b>Costo total: </b>
                                    {currentOrder?.cost}
                                </ListGroupItem>
                            </ListGroup>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header className="app-card-header">Repuestos utilizados</Card.Header>

                        <Card.Body>
                            <p>{currentOrder?.partsUsed}</p>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header className="app-card-header">Observaciones</Card.Header>

                        <Card.Body>
                            <p className={styles.paragraph}>{currentOrder?.observations}</p>
                        </Card.Body>
                    </Card>
                </Masonry>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

WorkOrderDetails.defaultProps = {
    show: false,
    onClose: undefined,
}

export default WorkOrderDetails
