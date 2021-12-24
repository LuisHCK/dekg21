import React from 'react'
import { Card, Col, Row, Image, Badge, Button } from 'react-bootstrap'
import { TEmployee } from 'types/employee'
import { getAssetPath, getRouteWithParams } from 'utils/services'
import { ReactComponent as IconTelephone } from 'bootstrap-icons/icons/telephone.svg'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import { ROUTER_PATHS } from 'app-constants/router-paths'

type TProps = {
    employee: TEmployee
}

const EmployeeCard = ({ employee }: TProps): React.ReactElement => {
    return (
        <Card>
            <Row className="g-0">
                <Col xs="3" className="p-2 d-flex align-items-center justify-content-center">
                    <Image
                        src={getAssetPath(employee.photo?.url)}
                        className={styles.avatar}
                        roundedCircle
                    />
                </Col>

                <Col xs="9">
                    <Card.Body>
                        <Card.Title className="d-flex w-100 justify-content-between">
                            <span>
                                {employee.firstName} {employee.lastName}
                            </span>
                            <Badge>{employee.role}</Badge>
                        </Card.Title>
                        <div>
                            <IconTelephone />
                            <span className="mx-2">{employee.phone}</span>
                        </div>
                    </Card.Body>

                    <Card.Footer>
                        <Button
                            // @ts-ignore
                            as={Link}
                            to={getRouteWithParams(ROUTER_PATHS.EMPLOYEES.EDIT, [
                                {
                                    key: 'id',
                                    value: employee.id,
                                },
                            ])}
                        >
                            Editar
                        </Button>
                    </Card.Footer>
                </Col>
            </Row>
        </Card>
    )
}

export default EmployeeCard
