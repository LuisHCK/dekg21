import { ROUTER_PATHS } from 'app-constants/router-paths'
import EmployeeCard from 'components/employee/employee-card'
import PageTitle from 'components/page-title'
import React, { useEffect } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { GET_ALL_EMPLOYEES } from 'store/actions/employee.actions'
import { SELECT_EMPLOYEE_STATE } from 'store/selectors/employee.selector'

const EmployeeListPage = (): React.ReactElement => {
    const dispatch = useDispatch()
    const { employees } = useSelector(SELECT_EMPLOYEE_STATE)

    useEffect(() => {
        dispatch(GET_ALL_EMPLOYEES())
    }, [dispatch])

    return (
        <div>
            <PageTitle title="Lista de empleados">
                <Button
                    // @ts-ignore
                    as={Link}
                    to={ROUTER_PATHS.EMPLOYEES.ADD}
                    variant="primary"
                >
                    Registrar empleado
                </Button>
            </PageTitle>
            <Row>
                {employees.map((employee) => (
                    <Col xs="12" md="6" lg="4" key={`employee-row-${employee.id}`}>
                        <EmployeeCard employee={employee} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default EmployeeListPage
