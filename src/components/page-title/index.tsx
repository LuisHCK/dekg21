import React from 'react'
import styles from './styles.module.scss'

type TProps = {
    title?: string
    children?: React.ReactNode
}

const PageTitle = ({ title, children }: TProps): React.ReactElement => {
    return (
        <div className={styles.container}>
            <h4>{title}</h4>
            <div className={styles.tools_area}>{children}</div>
        </div>
    )
}

export default PageTitle
