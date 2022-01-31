import React, { useEffect, useState } from 'react'
import { get } from 'lodash'
import { Button, Modal } from 'react-bootstrap'

import ContentForm from 'components/content-form'
import { useDispatch, useSelector } from 'react-redux'
import { GET_ALL_MACHINES } from 'store/actions/machine.actions'
import {
    CREATE_MAINTENANCE_REGISTER,
    UPDATE_MAINTENANCE_REGISTER,
} from 'store/actions/maintenance-register.actions'
import { SELECT_MACHINERY_STATE } from 'store/selectors/machinery.selector'
import { SELECT_CURRENT_MAINTENANCE_REGISTER } from 'store/selectors/maintenance-register.selector'
import { TFormSet, TMachineryForm } from 'types/machinery'
import { flattenForm, formIsValid } from 'utils/services'
import formset from './formset'
import { toast } from 'react-toastify'

interface IProps {
    show: boolean
    onClose: () => void
}

const MaintenanceRegisterForm = ({ show, onClose }: IProps): React.ReactElement => {
    const [registerForm, setRegisterForm] = useState<TMachineryForm>(formset)
    const { machines } = useSelector(SELECT_MACHINERY_STATE)
    const currentRegister = useSelector(SELECT_CURRENT_MAINTENANCE_REGISTER)
    const [formLoaded, setFormLoaded] = useState<boolean>(false)
    const [machinesLoaded, setMachinesLoaded] = useState<boolean>(false)
    const dispatch = useDispatch()

    const handleChange = (data: TFormSet) => {
        setRegisterForm({ ...registerForm, formsets: [data] })
    }

    const saveForm = async () => {
        if (!registerForm || !formIsValid(registerForm?.formsets)) {
            toast.error('Por favor revise el formulario', { position: 'top-right' })
            return
        }

        const formData = flattenForm(registerForm.formsets)

        if (currentRegister?.id) {
            await dispatch(UPDATE_MAINTENANCE_REGISTER({ id: currentRegister.id, data: formData }))
        } else {
            await dispatch(CREATE_MAINTENANCE_REGISTER({ data: formData }))
        }

        toast.success('Se guardó con éxito', { position: 'top-right' })
        onClose()
    }

    useEffect(() => {
        dispatch(GET_ALL_MACHINES())
    }, [dispatch])

    useEffect(() => {
        if (show && registerForm && machines && !machinesLoaded) {
            const machinesList = machines.map((machine) => ({
                key: machine.id,
                label: machine.name,
            }))
            const defaultOption = { key: '', label: 'Seleccione una maquina', disabled: true }
            const options = [defaultOption, ...machinesList]

            const updatedFormset: TFormSet[] = registerForm.formsets.map((formset) => ({
                ...formset,
                fields: formset.fields.map((field) => {
                    if (field.name === 'machine' && field.nativeType === 'select') {
                        return { ...field, options }
                    }
                    return field
                }),
            }))

            setRegisterForm({ formsets: updatedFormset })
            setMachinesLoaded(true)
        }
    }, [show, machines, registerForm, machinesLoaded])

    useEffect(() => {
        if (!formLoaded) {
            if (registerForm && currentRegister) {
                const updatedFormset: TFormSet[] = registerForm.formsets.map((formset) => ({
                    ...formset,
                    fields: formset.fields.map((field) => {
                        const value = get(currentRegister, field.name)
                        const isObject = typeof value === 'object'

                        return {
                            ...field,
                            value: isObject ? value.id : value,
                        }
                    }),
                }))

                setRegisterForm({ ...registerForm, formsets: updatedFormset })
                setFormLoaded(true)
            }
        }
    }, [dispatch, registerForm, machines, formLoaded, currentRegister])

    return (
        <Modal show={show} onHide={onClose} backdrop="static" size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    {currentRegister?.id ? 'Editar' : 'Crear'} Registro de Mantenimiento
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ContentForm form={registerForm.formsets[0]} onChange={handleChange} hideTitle />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={saveForm}>
                    Guardar
                </Button>
                <Button variant="secondary" onClick={onClose}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MaintenanceRegisterForm
