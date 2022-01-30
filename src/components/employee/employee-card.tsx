import React from 'react'
import { Card, Col, Row, Image, Badge, Button } from 'react-bootstrap'
import { TEmployee } from 'types/employee'
import { ReactComponent as IconTelephone } from 'bootstrap-icons/icons/telephone.svg'
import styles from './styles.module.scss'
import classNames from 'classnames'
import { isObject } from 'lodash'
import { readFileAsB64 } from 'utils/storage'

type TProps = {
    employee: TEmployee
    onClickShow: (id: number) => void
}

const EmployeeCard = ({ employee, onClickShow }: TProps): React.ReactElement => {
    return (
        <Card>
            <Row className="g-0">
                <Col xs="3" className="p-2 d-flex align-items-center justify-content-center">
                    <Image
                        src={
                            isObject(employee.photo)
                                ? readFileAsB64(employee.photo?.path)
                                : '/img/default-avatar.jpg'
                        }
                        className={styles.avatar}
                        roundedCircle
                    />
                </Col>

                <Col xs="9">
                    <Card.Body>
                        <Card.Title
                            className={classNames(
                                'd-flex w-100 justify-content-between',
                                styles.title,
                            )}
                        >
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
                        <Button onClick={() => onClickShow(employee.id)} variant="secondary">
                            Ver detalles
                        </Button>
                    </Card.Footer>
                </Col>
            </Row>
        </Card>
    )
}

export default EmployeeCard
