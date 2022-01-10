import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { SELECT_INVENTORY_STATE } from 'store/selectors/inventory.selector'
import { TPart } from 'types/inventory'

type TProps = {
    show?: boolean
    onClose?: () => void
    onSubmit?: (data: TPart) => void
}

const InventoryPartForm = ({ show, onSubmit, onClose }: TProps): React.ReactElement => {
    const { currentPart } = useSelector(SELECT_INVENTORY_STATE)

    return (
        <Modal show={show} onHide={onClose} backdrop="static" size="lg">
            <Modal.Header>
                <Modal.Title>
                    {currentPart?.id
                        ? `Editar ${currentPart.name} - ${currentPart.brand}`
                        : 'Registar nuevo repuesto'}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body></Modal.Body>

            <Modal.Footer>
                <Button variant="primary">Guardar</Button>
                <Button variant="secondary" onClick={onClose}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

InventoryPartForm.defaultProps = {
    show: false,
    onClose: undefined,
    onSubmit: undefined,
}

export default InventoryPartForm
