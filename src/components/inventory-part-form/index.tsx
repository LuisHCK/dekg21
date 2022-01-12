import ContentForm from 'components/content-form'
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { SELECT_INVENTORY_STATE } from 'store/selectors/inventory.selector'
import { TPart } from 'types/inventory'
import { TFormSet } from 'types/machinery'
import { flattenForm, formIsValid } from 'utils/services'
import { buildFormset } from './formset'

type TProps = {
    show?: boolean
    onClose?: () => void
    onSubmit?: (data: Partial<TPart>) => void
}

const InventoryPartForm = ({ show, onSubmit, onClose }: TProps): React.ReactElement => {
    const { currentPart } = useSelector(SELECT_INVENTORY_STATE)
    const [formData, setFormData] = useState<TFormSet>()
    const dispatch = useDispatch()

    const handleChange = (data: TFormSet) => {
        setFormData(data)
    }

    const handleSubmit = () => {
        if (formData && formIsValid([formData])) {
            const data = flattenForm([formData]) as Partial<TPart>
            onSubmit?.(data)
            toast.success('Se guardó con éxito', { position: 'top-right' })
            return
        }

        return toast.warn('Por favor revisa el formulario', { position: 'top-right' })
    }

    useEffect(() => {
        setFormData(buildFormset(currentPart))
    }, [dispatch, currentPart])

    return (
        <Modal show={show} onHide={onClose} backdrop="static" size="lg">
            <Modal.Header>
                <Modal.Title>
                    {currentPart?.id
                        ? `Editar ${currentPart.name} - ${currentPart.brand}`
                        : 'Registar nuevo repuesto'}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {formData && <ContentForm form={formData} onChange={handleChange} hideTitle />}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>
                    Guardar
                </Button>
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
