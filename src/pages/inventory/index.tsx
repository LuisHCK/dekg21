import React, { useEffect } from 'react'
import PageTitle from 'components/page-title'
import { Button, ButtonGroup, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { SELECT_INVENTORY_STATE } from 'store/selectors/inventory.selector'
import {
    CLEAN_CURRENT_PART,
    CREATE_PART,
    GET_ALL_PARTS,
    GET_CURRENT_PART,
    TOGGLE_PART_FORM,
    UPDATE_PART,
} from 'store/actions/inventory.actions'
import InventoryPartForm from 'components/inventory-part-form'
import { TPart } from 'types/inventory'

const InventoryPage = (): React.ReactElement => {
    const dispatch = useDispatch()
    const { parts, showForm, currentPart } = useSelector(SELECT_INVENTORY_STATE)

    const openEdit = async (part: TPart) => {
        await dispatch(GET_CURRENT_PART({ id: part.id }))
        toggleForm()
    }

    const openAddPart = () => {
        dispatch(CLEAN_CURRENT_PART())
        toggleForm()
    }

    const toggleForm = () => dispatch(TOGGLE_PART_FORM())

    const handleSave = async (data: Partial<TPart>) => {
        if (currentPart) {
            await dispatch(UPDATE_PART({ id: currentPart.id, data }))
        } else {
            await dispatch(CREATE_PART({ data }))
        }

        dispatch(GET_ALL_PARTS())
        toggleForm()
    }

    const renderParts = (): React.ReactNode =>
        parts?.map((part) => (
            <tr key={`part-row-${part.id}`}>
                <td>{part.id}</td>
                <td>{part.name}</td>
                <td>{part.brand}</td>
                <td>
                    {part.content}
                    {part.unit}
                </td>
                <td>C${part.price}</td>
                <td>{part.stock}</td>
                <td>
                    <ButtonGroup size="sm">
                        <Button onClick={() => openEdit(part)}>Editar</Button>
                        <Button variant="secondary">Detalles</Button>
                    </ButtonGroup>
                </td>
            </tr>
        ))

    useEffect(() => {
        dispatch(GET_ALL_PARTS())
    }, [dispatch])

    return (
        <div>
            <PageTitle title="Inventario">
                <Button variant="primary" onClick={openAddPart}>
                    Agregar repuesto
                </Button>
            </PageTitle>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Marca</th>
                        <th>Presentación</th>
                        <th>Precio</th>
                        <th>Existencias</th>
                        <th>Opciones</th>
                    </tr>
                </thead>

                <tbody>
                    {parts?.length ? (
                        renderParts()
                    ) : (
                        <tr>
                            <td colSpan={7} className="text-center">
                                No hay registros
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <InventoryPartForm show={showForm} onClose={toggleForm} onSubmit={handleSave} />
        </div>
    )
}

export default InventoryPage
