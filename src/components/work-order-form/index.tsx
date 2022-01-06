import ContentForm from 'components/content-form'
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { GET_ALL_EMPLOYEES } from 'store/actions/employee.actions'
import { GET_MACHINERY } from 'store/actions/machine.actions'
import { SELECT_EMPLOYEE_STATE } from 'store/selectors/employee.selector'
import { SELECT_MACHINERY_STATE } from 'store/selectors/machinery.selector'
import { SELECT_WORK_ORDER_STATE } from 'store/selectors/work-order.selectors'
import { TFormSet } from 'types/machinery'
import { TWorkOrderPostBody } from 'types/work-order'
import { flattenForm } from 'utils/services'
import { buildFormset } from './formset'

type TWorkOrderProps = {
    onSave?: (formset: TWorkOrderPostBody) => void
    onCancel?: () => void
}

const WorkOrderForm = ({ onSave, onCancel }: TWorkOrderProps): React.ReactElement => {
    const [formset, setFormset] = useState<TFormSet>()
    const { employees } = useSelector(SELECT_EMPLOYEE_STATE)
    const { machines } = useSelector(SELECT_MACHINERY_STATE)
    const { currentOrder } = useSelector(SELECT_WORK_ORDER_STATE)
    const dispatch = useDispatch()

    const handleChange = (data: TFormSet) => {
        setFormset(data)
    }

    const handleSave = () => {
        if (formset) {
            const data: any = flattenForm([formset])
            onSave?.(data)
        }
    }

    useEffect(() => {
        if (!formset && employees && machines) {
            const newFormset = buildFormset(machines, employees, currentOrder)
            setFormset(newFormset)
        }
    }, [employees, machines, currentOrder, formset])

    useEffect(() => {
        dispatch(GET_ALL_EMPLOYEES())
        dispatch(GET_MACHINERY())
    }, [dispatch])

    return !!formset ? (
        <>
            <ContentForm onChange={handleChange} form={formset} hideTitle />{' '}
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
