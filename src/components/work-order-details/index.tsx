import React from 'react'
import { get } from 'lodash'
import moment from 'moment'
import { Button, Card, Col, ListGroup, ListGroupItem, Modal, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { SELECT_WORK_ORDER_STATE } from 'store/selectors/work-order.selectors'
import { getAssetPath } from 'utils/services'
import styles from './styles.module.scss'
import classNames from 'classnames'
import Masonry from 'react-masonry-css'

type TWorkDetailsProps = {
    show?: boolean
    onClose?: () => void
}

const WorkOrderDetails = ({ show, onClose }: TWorkDetailsProps): React.ReactElement => {
    const { currentOrder } = useSelector(SELECT_WORK_ORDER_STATE)

    return (
        <Modal show={show} onHide={onClose} size="lg">
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
                            </ListGroup>
                        </Card.Body>
                    </Card>

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
                                    {currentOrder?.area}x
                                </ListGroupItem>
                                <ListGroupItem>
                                    <b>Tipo: </b>
                                    {currentOrder?.type === 'corrective'
                                        ? 'Correctivo'
                                        : 'Preventivo'}
                                </ListGroupItem>
                            </ListGroup>
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
