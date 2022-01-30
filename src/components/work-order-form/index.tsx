import React, { useEffect, useMemo, useState } from 'react'
import ContentForm from 'components/content-form'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { GET_ALL_EMPLOYEES } from 'store/actions/employee.actions'
import { GET_ALL_PARTS } from 'store/actions/inventory.actions'
import { GET_MACHINERY } from 'store/actions/machine.actions'
import { SELECT_EMPLOYEE_STATE } from 'store/selectors/employee.selector'
import { SELECT_INVENTORY_STATE } from 'store/selectors/inventory.selector'
import { SELECT_MACHINERY_STATE } from 'store/selectors/machinery.selector'
import { SELECT_WORK_ORDER_STATE } from 'store/selectors/work-order.selectors'

import PartsSelect from 'components/parts-select'
import { TFormSet } from 'types/machinery'
import { flattenForm, formIsValid } from 'utils/services'
import { buildFormset } from './formset'
import { TWorkOrderPartUsed, TWorkOrderPostBody } from 'types/work-order'

type TWorkOrderProps = {
    onSave?: (formset: TWorkOrderPostBody) => void
    onCancel?: () => void
}

const WorkOrderForm = ({ onSave, onCancel }: TWorkOrderProps): React.ReactElement => {
    const [formset, setFormset] = useState<TFormSet>()
    const { employees } = useSelector(SELECT_EMPLOYEE_STATE)
    const { machines } = useSelector(SELECT_MACHINERY_STATE)
    const { currentOrder } = useSelector(SELECT_WORK_ORDER_STATE)
    const { parts } = useSelector(SELECT_INVENTORY_STATE)
    const dispatch = useDispatch()

    const handleChange = (data: TFormSet) => {
        setFormset(data)
    }

    const handleSave = () => {
        if (formset && !formIsValid([formset])) {
            toast.error('Por favor revise el formulario')
            return
        }

        if (formset) {
            const data: any = flattenForm([formset])
            onSave?.(data)
        }
    }

    const handlePartsChange = (parts: any) => {
        const updatedFields = formset?.fields.map((field) => {
            if (field.name === 'partUsed') {
                return { ...field, value: parts }
            }

            return { ...field }
        })

        if (updatedFields && formset) setFormset({ ...formset, fields: updatedFields })
    }

    const partsUsed = useMemo<TWorkOrderPartUsed[]>(() => {
        const fieldData = formset?.fields.find((field) => field.name === 'partUsed')

        if (fieldData && typeof fieldData.value === 'object') {
            return fieldData.value as TWorkOrderPartUsed[]
        }

        return []
    }, [formset])

    useEffect(() => {
        if (!formset && employees.length && machines.length && parts?.length) {
            const newFormset = buildFormset(machines, employees, parts, currentOrder)
            setFormset(newFormset)
        }
    }, [employees, machines, currentOrder, parts, formset])

    useEffect(() => {
        dispatch(GET_ALL_EMPLOYEES())
        dispatch(GET_MACHINERY())
        dispatch(GET_ALL_PARTS())
    }, [dispatch])

    return !!formset ? (
        <>
            <ContentForm
                onChange={handleChange}
                form={formset}
                renderOnly={{ from: 0, to: 5 }}
                hideTitle
            />

            {/* parts */}
            <PartsSelect partsUsed={partsUsed} onChange={handlePartsChange} />

            <ContentForm
                onChange={handleChange}
                form={formset}
                renderOnly={{ from: 6, to: formset.fields.length }}
                hideTitle
            />
            <Modal.Footer>
                <Button variant="primary" onClick={handleSave}>
                    Guardar
                </Button>
                <Button variant="secondary" onClick={onCancel}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </>
    ) : (
        <></>
    )
}

WorkOrderForm.defaultProps = {
    onSave: undefined,
    onCancel: undefined,
}

export default WorkOrderForm
