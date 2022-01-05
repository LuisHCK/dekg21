import { ROUTER_PATHS } from 'app-constants/router-paths'
import PageTitle from 'components/page-title'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { GET_MAINTENANCE_REGISTERS } from 'store/actions/maintenance-register.actions'
import { SELECT_MAINTENANCE_STATE } from 'store/selectors/maintenance-register.selector'
import { TTableColumn } from 'types/table'
import { TMaintenanceRegister } from 'types/maintenance-register'
import { getRouteWithParams } from 'utils/services'
import MaintenanceRegisterDetails from 'components/maintenance-register-details'

const MainteanceRegisterPage = (): React.ReactElement => {
    const { registers } = useSelector(SELECT_MAINTENANCE_STATE)
    const [showDetails, setShowDetails] = useState<boolean>(false)
    const [selectedRegister, setSelectedRegister] = useState<TMaintenanceRegister | undefined>(
        undefined,
    )
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
                    <Button
                        as={Link as any}
                        to={getRouteWithParams(ROUTER_PATHS.MAINTENANCE_REGISTER.EDIT, [
                            { key: 'id', value: register.id },
                        ])}
                        variant="secondary"
                    >
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

        if (typeof content !== 'object') {
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

    useEffect(() => {
        dispatch(GET_MAINTENANCE_REGISTERS())
    }, [dispatch])

    return (
        <div>
            <PageTitle title="Registro de mantenimiento">
                <Button
                    as={Link as any}
                    to={ROUTER_PATHS.MAINTENANCE_REGISTER.ADD}
                    variant="primary"
                >
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
                </tbody>
            </Table>

            <MaintenanceRegisterDetails
                show={showDetails}
                onClose={closeRegisterDetails}
                register={selectedRegister}
            />
        </div>
    )
}

export default MainteanceRegisterPage
