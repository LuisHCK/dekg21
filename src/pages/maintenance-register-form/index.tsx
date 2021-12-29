import { ROUTER_PATHS } from 'app-constants/router-paths'
import ContentForm from 'components/content-form'
import PageTitle from 'components/page-title'
import { get } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { GET_MACHINERY } from 'store/actions/machine.actions'
import {
    CLEAN_CURRENT_MAINTENANCE_REGISTER,
    CREATE_MAINTENANCE_REGISTER,
    GET_CURRENT_MAINTENANCE_REGISTER,
    UPDATE_MAINTENANCE_REGISTER,
} from 'store/actions/maintenance-register.actions'
import { SELECT_MACHINERY_STATE } from 'store/selectors/machinery.selector'
import { SELECT_CURRENT_MAINTENANCE_REGISTER } from 'store/selectors/maintenance-register.selector'
import { TFormSet, TMachineryForm } from 'types/machinery'
import { flattenForm, formIsValid } from 'utils/services'
import formset from './formset'

const MaintenanceRegisterForm = (): React.ReactElement => {
    const { id } = useParams<{ id: string }>()
    const [registerForm, setRegisterForm] = useState<TMachineryForm>(formset)
    const { machines } = useSelector(SELECT_MACHINERY_STATE)
    const currentRegister = useSelector(SELECT_CURRENT_MAINTENANCE_REGISTER)
    const [formLoaded, setFormLoaded] = useState<boolean>(false)
    const [machinesLoaded, setMachinesLoaded] = useState<boolean>(false)
    const history = useHistory()
    const dispatch = useDispatch()

    const handleChange = (data: TFormSet) => {
        setRegisterForm({ ...registerForm, formsets: [data] })
    }

    const saveForm = async () => {
        if (!formIsValid(registerForm.formsets)) {
            return
        }

        const formData = flattenForm(registerForm.formsets)

        if (id) {
            await dispatch(UPDATE_MAINTENANCE_REGISTER({ id, data: formData }))
        } else {
            await dispatch(CREATE_MAINTENANCE_REGISTER({ data: formData }))
        }
        history.push(ROUTER_PATHS.MAINTENANCE_REGISTER.ROOT)
    }

    useEffect(() => {
        dispatch(GET_MACHINERY())

        if (id) dispatch(GET_CURRENT_MAINTENANCE_REGISTER({ id }))

        return () => {
            dispatch(CLEAN_CURRENT_MAINTENANCE_REGISTER())
        }
    }, [dispatch, id])

    useEffect(() => {
        if (registerForm && machines && !machinesLoaded) {
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
    }, [machines, registerForm, machinesLoaded])

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
        <div>
            <PageTitle title={`${id ? 'Editar' : 'Crear'} registro de mantenimiento`}>
                <ButtonGroup>
                    <Button
                        variant="warning"
                        as={Link as any}
                        to={ROUTER_PATHS.MAINTENANCE_REGISTER.ROOT}
                    >
                        Cancelar
                    </Button>
                    <Button
                        as={Link as any}
                        to={ROUTER_PATHS.MAINTENANCE_REGISTER.ADD}
                        variant="primary"
                        onClick={saveForm}
                    >
                        Guardar
                    </Button>
                </ButtonGroup>
            </PageTitle>

            <ContentForm form={registerForm.formsets[0]} onChange={handleChange} hideTitle />
        </div>
    )
}

export default MaintenanceRegisterForm
