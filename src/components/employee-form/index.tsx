import React, { useEffect, useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { get } from 'lodash'
import ContentForm from 'components/content-form'
import Masonry from 'react-masonry-css'
import { toast } from 'react-toastify'

import { employeeForm as form } from './formset'
import { TFormSet, TMachineryForm } from 'types/machinery'
import { SELECT_CURRENT_EMPLOYEE } from 'store/selectors/employee.selector'
import { CREATE_EMPLOYEE, UPDATE_EMPLOYEE } from 'store/actions/employee.actions'
import { flattenForm, formIsValid } from 'utils/services'

type TProps = {
    show: boolean
    onClose: () => void
}

const EmployeeForm = ({ show, onClose }: TProps): React.ReactElement => {
    const [employeeForm, setEmployeeForm] = useState<TMachineryForm>(form)
    const [formLoaded, setFormLoaded] = useState<boolean>(false)
    const currentEmployee = useSelector(SELECT_CURRENT_EMPLOYEE)
    const dispatch = useDispatch()

    const handleOnChange = (formset: TFormSet) => {
        const updatedFormsets = employeeForm.formsets.map((prevFormset) => {
            if (prevFormset.id === formset.id) {
                return { ...formset }
            }
            return { ...prevFormset }
        })

        setEmployeeForm((prev) => ({ ...prev, formsets: updatedFormsets }))
    }

    const handleSave = async () => {
        if (!formIsValid(employeeForm?.formsets || [])) {
            return
        }

        const data = flattenForm(employeeForm.formsets)

        if (currentEmployee?.id) {
            await dispatch(UPDATE_EMPLOYEE({ id: Number(currentEmployee.id), data }))
        } else {
            await dispatch(CREATE_EMPLOYEE({ data }))
        }

        toast.success('Se guardó con éxito', { position: 'top-right' })
        onClose()
    }

    useEffect(() => {
        if (show && currentEmployee && employeeForm && !formLoaded) {
            const formsets = employeeForm.formsets.map((formset) => ({
                ...formset,
                fields: formset.fields.map((field) => ({
                    ...field,
                    value: get(currentEmployee, field.name),
                })),
            }))

            setEmployeeForm((prev) => ({ ...prev, formsets }))
            setFormLoaded(true)
        }
    }, [currentEmployee, employeeForm, formLoaded, show])

    useEffect(() => {
        if (!show) {
            setFormLoaded(false)
            setEmployeeForm(form)
        }
    }, [show])

    return (
        <Modal show={show} size="lg" onHide={onClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>
                    {currentEmployee?.id ? 'Editar colaborador' : 'Registrar colaborador'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Masonry
                    breakpointCols={{ default: 2, 780: 1 }}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {employeeForm.formsets.map((formset) => (
                        <Card key={`employee-form-item-${formset.id}`}>
                            <Card.Header className="app-card-header">{formset.title}</Card.Header>
                            <Card.Body>
                                <ContentForm form={formset} onChange={handleOnChange} hideTitle />
                            </Card.Body>
                        </Card>
                    ))}
                </Masonry>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSave}>
                    Guardar
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EmployeeForm
