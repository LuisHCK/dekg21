import React from 'react'
import moment from 'moment'
import { Alert, Button, Card, ListGroup, ListGroupItem, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { SELECT_WORK_ORDER_STATE } from 'store/selectors/work-order.selectors'
import styles from './styles.module.scss'
import Masonry from 'react-masonry-css'
import { readFileAsB64 } from 'utils/storage'
import { isObject } from 'lodash'
import PartsUsed from './parts-used'

type TWorkDetailsProps = {
    show?: boolean
    onClose?: () => void
}

const WorkOrderDetails = ({ show, onClose }: TWorkDetailsProps): React.ReactElement => {
    const { currentOrder } = useSelector(SELECT_WORK_ORDER_STATE)

    const partsTotal =
        currentOrder?.partUsed?.reduce((prev, current) => {
            const subTotal = Number(current.part?.price) * Number(current.quantity)
            return subTotal + prev
        }, 0) || 0

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
                                        src={
                                            isObject(currentOrder?.machine.photo)
                                                ? readFileAsB64(currentOrder?.machine?.photo.path)
                                                : ''
                                        }
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
                                    <b>Repuestos: </b>
                                    C${partsTotal}
                                </ListGroupItem>
                                <ListGroupItem>
                                    <b>Costo Adicional: </b>
                                    C${currentOrder?.cost}
                                </ListGroupItem>
                                <ListGroupItem>
                                    <b>Costo TOTAL: </b>
                                    C${Number(currentOrder?.cost) + partsTotal}
                                </ListGroupItem>
                            </ListGroup>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header className="app-card-header">Repuestos utilizados</Card.Header>

                        <Card.Body>
                            <PartsUsed partsUsed={currentOrder?.partUsed} total={partsTotal} />
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header className="app-card-header">Observaciones</Card.Header>

                        <Card.Body>
                            {currentOrder?.observations ? (
                                <p className={styles.paragraph}>{currentOrder.observations}</p>
                            ) : (
                                <Alert variant="info">No hay Observaciones</Alert>
                            )}
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
