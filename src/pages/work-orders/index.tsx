import React, { useEffect, useState } from 'react'
import { Alert, Button, ButtonGroup, Modal, Spinner, Table } from 'react-bootstrap'
import { ReactComponent as IconInbox } from 'bootstrap-icons/icons/inbox.svg'
import { toast } from 'react-toastify'
import PageTitle from 'components/page-title'
import { useDispatch, useSelector } from 'react-redux'
import {
    CLEAN_CURRENT_WORK_ORDER,
    CREATE_WORK_ORDER,
    GET_CURRENT_WORK_ORDER,
    GET_WORK_ORDERS,
    UPDATE_WORK_ORDER,
} from 'store/actions/work-order.reducer'
import { SELECT_WORK_ORDER_STATE } from 'store/selectors/work-order.selectors'
import { TWorkOrder, TWorkOrderPostBody } from 'types/work-order'
import WorkOrderForm from 'components/work-order-form'
import moment from 'moment'
import WorkOrderDetails from 'components/work-order-details'
import { GET_ALL_PARTS } from 'store/actions/inventory.actions'

const WorkOrdersPage = (): React.ReactElement => {
    const [showForm, setShowForm] = useState<boolean>(false)
    const [showDetails, setShowDetails] = useState<boolean>(false)
    const dispatch = useDispatch()
    const { loading, workOrders, currentOrder } = useSelector(SELECT_WORK_ORDER_STATE)

    const selectCurrentWorkOrder = async (workOrder: TWorkOrder) => {
        await dispatch(GET_CURRENT_WORK_ORDER({ id: workOrder.id }))
        setShowForm(true)
    }

    const toggleForm = () => setShowForm((prev) => !prev)

    const toggleDetails = () => setShowDetails((prev) => !prev)

    const openCreateForm = () => {
        dispatch(CLEAN_CURRENT_WORK_ORDER())
        setTimeout(() => {
            toggleForm()
        }, 100)
    }

    const handleHide = () => {
        toggleForm()

        setTimeout(() => {
            dispatch(CLEAN_CURRENT_WORK_ORDER())
        }, 300)
    }

    const saveWorkOrder = async (data: TWorkOrderPostBody) => {
        if (currentOrder) {
            await dispatch(UPDATE_WORK_ORDER({ id: currentOrder.id, data }))
        } else {
            await dispatch(CREATE_WORK_ORDER({ data }))
        }
        toast.success('Se guard?? con ??xito', { position: 'top-right' })
        setShowForm(false)
    }

    const handleShowDetails = (id: number) => {
        dispatch(GET_CURRENT_WORK_ORDER({ id }))
        toggleDetails()
    }

    useEffect(() => {
        dispatch(GET_WORK_ORDERS())
        dispatch(GET_ALL_PARTS())
    }, [dispatch])

    const renderRows = (): React.ReactNode => {
        if (workOrders?.length) {
            return workOrders?.map((workOrder) => (
                <tr key={`work-order-row-${workOrder.id}`}>
                    <td>{workOrder.id}</td>
                    <td>{workOrder.machine?.name}</td>
                    <td>{moment(workOrder.date).format('DD/MM/YYYY')}</td>
                    <td>{workOrder.area}</td>
                    <td>
                        {workOrder.employee.firstName} {workOrder.employee.lastName}
                    </td>
                    <td>
                        <ButtonGroup>
                            <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => handleShowDetails(workOrder.id)}
                            >
                                Ver
                            </Button>
                            <Button size="sm" onClick={() => selectCurrentWorkOrder(workOrder)}>
                                Editar
                            </Button>
                        </ButtonGroup>
                    </td>
                </tr>
            ))
        }

        return (
            <tr>
                <td colSpan={6}>
                    <Alert variant="warning" className="text-center">
                        <IconInbox /> No hay registros
                    </Alert>
                </td>
            </tr>
        )
    }

    return (
        <div>
            <PageTitle title="??rdenes de trabajo">
                <Button variant="primary" onClick={openCreateForm}>
                    Registar trabajo
                </Button>
            </PageTitle>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No. Orden</th>
                        <th>Maquina</th>
                        <th>Fecha</th>
                        <th>Area</th>
                        <th>T??cnico</th>
                        <th>Acci??n</th>
                    </tr>
                </thead>

                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={6} className="text-center">
                                <Spinner animation="border" />
                            </td>
                        </tr>
                    ) : (
                        renderRows()
                    )}
                </tbody>
            </Table>

            <Modal show={showForm} onHide={handleHide} size="lg" backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {currentOrder?.id ? 'Editar' : 'Registrar'} orden de trabajo
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {showForm && <WorkOrderForm onSave={saveWorkOrder} onCancel={toggleForm} />}
                </Modal.Body>
            </Modal>

            <WorkOrderDetails show={showDetails} onClose={toggleDetails} />
        </div>
    )
}

export default WorkOrdersPage
