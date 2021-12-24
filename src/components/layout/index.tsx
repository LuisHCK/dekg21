import classnames from 'classnames'
import AppNavbar from 'components/navbar'
import SideNav from 'components/sidenav'
import React from 'react'
import styles from './styles.module.scss'

type TProps = {
    children: React.ReactNode
}

const AppLayout = ({ children }: TProps): React.ReactElement => {
    return (
        <div>
            <AppNavbar />
            <div className="d-flex">
                <SideNav />
                <main className={classnames('container', 'bg-light', styles.main_content)}>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AppLayout
