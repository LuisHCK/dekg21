import classNames from 'classnames'
import React from 'react'
import { ReactComponent as IconHome } from 'bootstrap-icons/icons/house.svg'
import { ReactComponent as IconNut } from 'bootstrap-icons/icons/nut.svg'
import { ReactComponent as IconPeople } from 'bootstrap-icons/icons/people.svg'
import { ReactComponent as IconWrench } from 'bootstrap-icons/icons/wrench.svg'
import { ReactComponent as IconJournal } from 'bootstrap-icons/icons/journal-check.svg'

import NavLink from './navlink'

import styles from './styles.module.scss'
import { ROUTER_PATHS } from 'app-constants/router-paths'

const navLinks = [
    {
        to: ROUTER_PATHS.HOME.ROOT,
        label: 'Inicio',
        icon: IconHome,
    },
    {
        to: ROUTER_PATHS.MACHINERY.ROOT,
        label: 'Maquinaria',
        icon: IconNut,
    },
    {
        to: ROUTER_PATHS.EMPLOYEES.ROOT,
        label: 'Empleados',
        icon: IconPeople,
    },
    {
        to: ROUTER_PATHS.MAINTENANCE_REGISTER.ROOT,
        label: 'Registro de mantenimiento',
        icon: IconWrench,
    },
    {
        to: ROUTER_PATHS.WORK_ORDER.ROOT,
        label: 'Órdenes de trabajo',
        icon: IconJournal,
    },
]

const SideNav = (): React.ReactElement => {
    return (
        <div className={classNames('bg-dark', styles.container)}>
            <ul className={styles.list_container}>
                {navLinks.map((link) => (
                    <NavLink
                        key={`nav-link-${link.to}`}
                        to={link.to}
                        label={link.label}
                        icon={link.icon}
                    />
                ))}
            </ul>
        </div>
    )
}

export default SideNav
