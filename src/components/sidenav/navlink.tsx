import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

type TProps = {
    to: string
    icon: React.FC
    label: string
}

const NavLink = ({ to, icon: Icon, label }: TProps): React.ReactElement => {
    return (
        <li className={classNames(styles.list_item)}>
            <Link to={to}>
                <Icon />
                <span>{label}</span>
            </Link>
        </li>
    )
}

export default NavLink
