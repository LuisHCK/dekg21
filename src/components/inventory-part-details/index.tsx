import React, { useMemo } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { SELECT_INVENTORY_STATE } from 'store/selectors/inventory.selector'
import { buildFormset } from 'components/inventory-part-form/formset'
import { get } from 'lodash'

const formset = buildFormset()

type TProps = {
    show: boolean
    onClose: () => void
}

const InventoryPartDetails = ({ show, onClose }: TProps): React.ReactElement => {
    const { currentPart } = useSelector(SELECT_INVENTORY_STATE)

    const partTitle = useMemo(
        () => (currentPart ? `${currentPart.name} - ${currentPart.brand}` : ''),
        [currentPart],
    )

    const partContent = useMemo(
        () => (currentPart ? `${currentPart.content}${currentPart.unit}` : ''),
        [currentPart],
    )

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {partTitle}
                    {' | '}
                    <span>{partContent}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    {formset.fields.map((field) => (
                        <Col
                            xs={12}
                            sm={6}
                            key={`${field.name}-${get(currentPart, 'id')}`}
                        >
                            <h6>{field.label}</h6>
                            <span>{get(currentPart, field.name)}</span>
                            <hr />
                        </Col>
                    ))}
                </Row>
            </Modal.Body>
        </Modal>
    )
}

export default InventoryPartDetails
