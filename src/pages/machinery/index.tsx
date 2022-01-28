import React, { useEffect } from 'react'
import PageTitle from 'components/page-title'
import { Link } from 'react-router-dom'
import { Card, Col, Row, Button, Spinner, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { GET_MACHINERY } from 'store/actions/machine.actions'
import { SELECT_MACHINERY_STATE } from 'store/selectors/machinery.selector'
import { getRouteWithParams } from 'utils/services'
import ClampLines from 'react-clamp-lines'
import { ROUTER_PATHS } from 'app-constants/router-paths'
import styles from './styles.module.scss'
import { readFileAsB64 } from 'utils/storage'
import { isObject } from 'lodash'

const Machinery = (): React.ReactElement => {
    const dispatch = useDispatch()
    const { loading, machines } = useSelector(SELECT_MACHINERY_STATE)

    useEffect(() => {
        dispatch(GET_MACHINERY())
    }, [dispatch])

    return (
        <div className="container-fluid">
            <PageTitle title="Maquinaria">
                <Button
                    // @ts-ignore
                    as={Link}
                    to={ROUTER_PATHS.MACHINERY.ADD}
                    variant="primary"
                >
                    Agregar maquinaria
                </Button>
            </PageTitle>

            <Row>
                {loading && (
                    <Col xs={12}>
                        <div className="w-100 text-center p-5">
                            <Spinner animation="grow" />
                        </div>
                    </Col>
                )}

                {machines.map((machine) => (
                    <Col
                        key={`machine-row-${machine.id}`}
                        xs={12}
                        sm={6}
                        lg={4}
                        xl={3}
                        className="d-flex"
                    >
                        <Card className="mb-4 w-100">
                            {typeof machine.photo === 'object' && (
                                <Card.Img
                                    className={styles.card_image}
                                    variant="top"
                                    src={
                                        isObject(machine?.photo)
                                            ? readFileAsB64(machine?.photo.path)
                                            : ''
                                    }
                                    alt={machine.name}
                                />
                            )}
                            <Card.Body className="h-100">
                                <Card.Title className="fs-6 fw-bold">{machine.name}</Card.Title>
                                <Card.Text as="div">
                                    <ClampLines
                                        id={`machine-desc-${machine.id}`}
                                        text={machine.description}
                                        lines={4}
                                        buttons={false}
                                    />
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Button
                                    variant="secondary"
                                    // @ts-ignore
                                    as={Link}
                                    to={getRouteWithParams(ROUTER_PATHS.MACHINERY.SHOW, [
                                        { key: 'id', value: machine.id },
                                    ])}
                                >
                                    Ver detalles
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}

                {!machines.length && <Alert variant="warning">No hay maquinas registradas</Alert>}
            </Row>
        </div>
    )
}

export default Machinery
