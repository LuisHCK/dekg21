import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import EmployeeForm from 'components/employee-form'
import EmployeeCard from 'components/employee/employee-card'
import PageTitle from 'components/page-title'

import {
    CLEAN_CURRENT_EMPLOYEE,
    GET_ALL_EMPLOYEES,
    GET_CURRENT_EMPLOYEE,
} from 'store/actions/employee.actions'
import { SELECT_EMPLOYEE_STATE } from 'store/selectors/employee.selector'
import EmployeeDetailsModal from 'components/employee-details'

const EmployeeListPage = (): React.ReactElement => {
    const { employees } = useSelector(SELECT_EMPLOYEE_STATE)
    const [showForm, setShowForm] = useState<boolean>(false)
    const [showDetails, setShowDetails] = useState<boolean>(false)
    const dispatch = useDispatch()

    const handleShow = (employeeId: number) => {
        dispatch(GET_CURRENT_EMPLOYEE({ id: employeeId }))
        setShowDetails(true)
    }

    const handleClose = () => {
        setShowDetails(false)
    }

    const handleEdit = () => {
        setShowDetails(false)
        setShowForm(true)
    }

    const handleNew = () => {
        dispatch(CLEAN_CURRENT_EMPLOYEE())
        setShowForm(true)
    }

    useEffect(() => {
        dispatch(GET_ALL_EMPLOYEES())
    }, [dispatch])

    return (
        <div>
            <PageTitle title="Lista de colaboradores">
                <Button onClick={handleNew} variant="primary">
                    Registrar colaborador
                </Button>
            </PageTitle>
            <Row>
                {employees.map((employee) => (
                    <Col xs="12" md="6" lg="4" key={`employee-row-${employee.id}`}>
                        <EmployeeCard employee={employee} onClickShow={handleShow} />
                    </Col>
                ))}
            </Row>

            {!employees.length && <Alert variant="warning">No hay colaboradores registrados</Alert>}

            <EmployeeForm show={showForm} onClose={() => setShowForm(false)} />

            <EmployeeDetailsModal show={showDetails} onClose={handleClose} onEdit={handleEdit} />
        </div>
    )
}

export default EmployeeListPage
