import React from 'react'
import { ROUTER_PATHS } from 'app-constants/router-paths'
import { AppRoute } from 'types'
import EmployeeListPage from 'pages/employee-list'
import EmployeeFormPage from 'pages/employee-form'

const LoginPage = React.lazy(() => import('pages/login'))
const DashboardPage = React.lazy(() => import('pages/dashboard'))
const MachineryPage = React.lazy(() => import('pages/machinery'))
const MachineryFormPage = React.lazy(() => import('pages/machine-form'))
const MachineryDetailsPage = React.lazy(() => import('pages/machinery-details'))

const APP_ROUTES: AppRoute[] = [
    {
        path: ROUTER_PATHS.LOGIN,
        component: LoginPage,
        exact: true,
        isPublic: true,
    },
    {
        path: [ROUTER_PATHS.HOME.ROOT, ROUTER_PATHS.HOME.ALT],
        component: DashboardPage,
        exact: true,
        isPublic: false,
    },
    {
        path: ROUTER_PATHS.MACHINERY.ROOT,
        component: MachineryPage,
        exact: true,
        isPublic: false,
    },
    {
        path: [ROUTER_PATHS.MACHINERY.ADD, ROUTER_PATHS.MACHINERY.EDIT],
        component: MachineryFormPage,
        exact: true,
        isPublic: false,
    },
    {
        path: ROUTER_PATHS.MACHINERY.SHOW,
        component: MachineryDetailsPage,
        exact: true,
        isPublic: false,
    },
    {
        path: ROUTER_PATHS.EMPLOYEES.ROOT,
        component: EmployeeListPage,
        exact: true,
        isPublic: false,
    },
    {
        path: [ROUTER_PATHS.EMPLOYEES.ADD, ROUTER_PATHS.EMPLOYEES.EDIT],
        component: EmployeeFormPage,
        exact: true,
        isPublic: false,
    },
]

export default APP_ROUTES