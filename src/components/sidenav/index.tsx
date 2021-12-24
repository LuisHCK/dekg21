import classNames from 'classnames'
import React from 'react'
import { ReactComponent as IconHome } from 'bootstrap-icons/icons/house.svg'
import { ReactComponent as IconNut } from 'bootstrap-icons/icons/nut.svg'
import { ReactComponent as IconPeople } from 'bootstrap-icons/icons/people.svg'

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
