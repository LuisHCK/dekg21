import React, { useEffect, useMemo } from 'react'
import BarChart from 'components/barchart'
import Calendar from 'components/calendar'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { ROUTER_PATHS } from 'app-constants/router-paths'
import { GET_ALL_EMPLOYEES } from 'store/actions/employee.actions'
import { GET_ALL_MACHINES } from 'store/actions/machine.actions'
import { GET_ALL_MAINTENANCE_REGISTERS } from 'store/actions/maintenance-register.actions'
import { SELECT_EMPLOYEE_STATE } from 'store/selectors/employee.selector'
import DashboardCardItem from 'components/dashboard-card-item'
import { SELECT_MACHINERY_STATE } from 'store/selectors/machinery.selector'
import { SELECT_WORK_ORDER_STATE } from 'store/selectors/work-order.selectors'
import { GET_WORK_ORDERS } from 'store/actions/work-order.reducer'

const DasboardPage = (): React.ReactElement => {
    const { employees } = useSelector(SELECT_EMPLOYEE_STATE)
    const { machines } = useSelector(SELECT_MACHINERY_STATE)
    const { workOrders } = useSelector(SELECT_WORK_ORDER_STATE)
    const dispatch = useDispatch()

    const cards = useMemo(
        () => [
            {
                title: 'Colaboradores registrados',
                value: employees.length,
                link: ROUTER_PATHS.EMPLOYEES.ROOT,
                linkLabel: 'Ver todos',
            },
            {
                title: 'Maquinas registradas',
                value: machines.length,
                link: ROUTER_PATHS.MACHINERY.ROOT,
                linkLabel: 'Ver todos',
            },
            {
                title: 'Órdenes de trabajo',
                value: workOrders?.length || 0,
                link: ROUTER_PATHS.WORK_ORDER.ROOT,
                linkLabel: 'Ver todos',
            },
        ],
        [employees, machines, workOrders],
    )

    useEffect(() => {
        dispatch(GET_ALL_EMPLOYEES())
        dispatch(GET_ALL_MAINTENANCE_REGISTERS())
        dispatch(GET_ALL_MACHINES())
        dispatch(GET_ALL_MAINTENANCE_REGISTERS())
        dispatch(GET_WORK_ORDERS())
    }, [dispatch])

    return (
        <div className="w-100">
            <Row className="mt-4">
                {cards.map((card) => (
                    <Col key={card.title} xs={12} md={6} lg={4}>
                        <DashboardCardItem
                            title={card.title}
                            link={card.link}
                            linkLabel={card.linkLabel}
                            value={card.value}
                        />
                    </Col>
                ))}
            </Row>

            <Row>
                <Col xs={12} sm={12}>
                    <Calendar />
                </Col>

                <Col xs={12} sm={12}>
                    <BarChart />
                </Col>
            </Row>
        </div>
    )
}

export default DasboardPage
