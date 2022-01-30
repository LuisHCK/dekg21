import React, { useEffect, useState } from 'react'
import PageTitle from 'components/page-title'
import moment from 'moment'
import { isObject } from 'lodash'
import { Alert, Button, ButtonGroup, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import {
    CLEAN_CURRENT_MAINTENANCE_REGISTER,
    GET_CURRENT_MAINTENANCE_REGISTER,
    GET_MAINTENANCE_REGISTERS,
} from 'store/actions/maintenance-register.actions'
import { SELECT_MAINTENANCE_STATE } from 'store/selectors/maintenance-register.selector'
import { TTableColumn } from 'types/table'
import { TMaintenanceRegister } from 'types/maintenance-register'
import MaintenanceRegisterDetails from 'components/maintenance-register-details'
import MaintenanceRegisterForm from 'components/maintenance-register-form'

const MainteanceRegisterPage = (): React.ReactElement => {
    const { registers } = useSelector(SELECT_MAINTENANCE_STATE)
    const [showDetails, setShowDetails] = useState<boolean>(false)
    const [selectedRegister, setSelectedRegister] = useState<TMaintenanceRegister | undefined>(
        undefined,
    )
    const [showForm, setShowForm] = useState<boolean>(false)
    const dispatch = useDispatch()

    const columns: TTableColumn<TMaintenanceRegister>[] = [
        { title: 'Area/Planta', field: 'area' },
        { title: 'Codigo', field: 'code' },
        { title: 'Frecuencia', field: 'frequency' },
        {
            title: 'Maquina',
            field: 'machine',
            render: (register) =>
                typeof register.machine === 'object' ? register.machine.name : '',
        },
        {
            title: 'Fecha',
            field: 'date',
            render: (register) => <span>{moment(register.date).format('MM/DD/Y')}</span>,
        },
        {
            title: 'Acción',
            field: 'id',
            render: (register) => (
                <ButtonGroup size="sm">
                    <Button variant="primary" onClick={() => showRegisterDetails(register)}>
                        Ver
                    </Button>
                    <Button onClick={() => openEditForm(register.id)} variant="secondary">
                        Editar
                    </Button>
                </ButtonGroup>
            ),
        },
    ]

    const renderField = (
        register: TMaintenanceRegister,
        column: TTableColumn<TMaintenanceRegister>,
    ) => {
        const content = register[column.field]

        if (column.render) {
            return column.render(register)
        }

        if (!isObject(content)) {
            return content
        }

        return <></>
    }

    const showRegisterDetails = (register: TMaintenanceRegister) => {
        setShowDetails((prev) => !prev)
        setSelectedRegister(register)
    }

    const closeRegisterDetails = () => {
        setShowDetails(false)
        setTimeout(() => {
            setSelectedRegister(undefined)
        }, 600)
    }

    const openCreateForm = () => {
        dispatch(CLEAN_CURRENT_MAINTENANCE_REGISTER())

        setTimeout(() => {
            setShowForm(true)
        }, 300)
    }

    const openEditForm = (id: number) => {
        dispatch(GET_CURRENT_MAINTENANCE_REGISTER({ id }))
        setTimeout(() => {
            setShowForm(true)
        }, 100)
    }

    useEffect(() => {
        dispatch(GET_MAINTENANCE_REGISTERS())
    }, [dispatch])

    return (
        <div>
            <PageTitle title="Registro de mantenimiento">
                <Button onClick={openCreateForm} variant="primary">
                    Nuevo registro
                </Button>
            </PageTitle>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={`col-${column.field}`}>{column.title}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {registers.map((register) => (
                        <tr key={`tr-reg-${register.id}`}>
                            {columns.map((column) => (
                                <td key={`td-register-${register.id}-col-${column.field}`}>
                                    {renderField(register, column)}
                                </td>
                            ))}
                        </tr>
                    ))}
                    {!registers.length && (
                        <tr>
                            <td colSpan={6}>
                                <Alert variant="warning">No hay mantenimientos registrados</Alert>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <MaintenanceRegisterDetails
                show={showDetails}
                onClose={closeRegisterDetails}
                register={selectedRegister}
            />

            <MaintenanceRegisterForm show={showForm} onClose={() => setShowForm(false)} />
        </div>
    )
}

export default MainteanceRegisterPage
