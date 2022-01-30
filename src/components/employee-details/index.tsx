import React from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { get, isObject } from 'lodash'
import Masonry from 'react-masonry-css'
import { Button, Card, ListGroup, Modal } from 'react-bootstrap'

import { SELECT_CURRENT_EMPLOYEE } from 'store/selectors/employee.selector'
import { readFileAsB64 } from 'utils/storage'
import { employeeForm } from 'pages/employee-form/formset'
import { TNodeAsset } from 'types/asset'
import { TFormField } from 'types/machinery'
import styles from './styles.module.scss'

interface IProps {
    show: boolean
    onClose: () => void
    onEdit: () => void
}

const EmployeeDetailsModal = ({ show, onClose, onEdit }: IProps): React.ReactElement => {
    const currentEmployee = useSelector(SELECT_CURRENT_EMPLOYEE)

    const renderField = (formfield: TFormField) => {
        const fieldData: TNodeAsset | string | number | undefined = get(
            currentEmployee,
            formfield.name,
        )

        if (isObject(fieldData)) {
            return (
                <div className="d-flex justify-content-center">
                    <img
                        className={classNames('img-thumbnail', styles.avatar)}
                        src={
                            isObject(currentEmployee?.photo)
                                ? readFileAsB64(currentEmployee?.photo?.path)
                                : '/img/default-avatar.jpg'
                        }
                        alt={currentEmployee?.firstName}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <b>{formfield.label}: </b>
                    <span>{fieldData || '-'}</span>
                </div>
            )
        }
    }

    return (
        <Modal show={show} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    {currentEmployee?.firstName} {currentEmployee?.lastName}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Masonry
                    breakpointCols={{ default: 2, 780: 1 }}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {employeeForm.formsets.map((formset) => (
                        <Card key={formset.id}>
                            <Card.Header className="app-card-header">{formset.title}</Card.Header>

                            <Card.Body>
                                <ListGroup variant="flush">
                                    {formset.fields.map((field) => (
                                        <ListGroup.Item key={`field-${field.name}`}>
                                            {renderField(field)}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    ))}
                </Masonry>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={onEdit}>
                    Editar
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    Cerar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EmployeeDetailsModal
