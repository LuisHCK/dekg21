import React, { useEffect } from 'react'
import PageTitle from 'components/page-title'
import { Button, ButtonGroup, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { SELECT_INVENTORY_STATE } from 'store/selectors/inventory.selector'
import { GET_ALL_PARTS, TOGGLE_PART_FORM } from 'store/actions/inventory.actions'
import InventoryPartForm from 'components/inventory-part-form'

const InventoryPage = (): React.ReactElement => {
    const dispatch = useDispatch()
    const { parts, showForm } = useSelector(SELECT_INVENTORY_STATE)

    const openEdit = () => {
        //
    }

    const toggleForm = () => dispatch(TOGGLE_PART_FORM())

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
                    <ButtonGroup>
                        <Button>Editar</Button>
                        <Button>Detalles</Button>
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
                <Button variant="primary" onClick={toggleForm}>
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

            <InventoryPartForm show={showForm} onClose={toggleForm} />
        </div>
    )
}

export default InventoryPage
