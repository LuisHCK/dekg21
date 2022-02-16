import React, { useEffect } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getAppName } from 'utils/services'
import Logo from 'assets/img/logo.png'
import styles from './styles.module.scss'
import { readFileAsB64 } from 'utils/storage'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { GET_GLOBAL_CONFIG_STATE } from 'store/selectors/config.selector'
import { getSettingsByName } from 'backend/controllers/settings.controller'
import { SET_GLOBAL_SETTINGS } from 'store/actions/config.actions'

const AppNavbar = (): React.ReactElement => {
    const generalSettings = useSelector(GET_GLOBAL_CONFIG_STATE)
    const dispatch = useDispatch()

    useEffect(() => {
        const loadSettings = async () => {
            const settings = await getSettingsByName('general-settings')
            dispatch(SET_GLOBAL_SETTINGS(settings.value))
        }

        loadSettings()
    }, [dispatch])

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className={styles.navbar}>
            <div className="d-flex justify-content-between w-100">
                <Navbar.Brand as={Link} to="/inicio" className={styles.brand}>
                    <img src={Logo} className={styles.logo} alt="logo" />
                    {getAppName()}
                </Navbar.Brand>

                {!!generalSettings && (
                    <Navbar.Brand
                        as={Link}
                        to="/inicio"
                        className={classNames(styles.brand, 'mx-0')}
                    >
                        {generalSettings.companyName}
                        {!!generalSettings.logo && (
                            <img
                                src={readFileAsB64(String(generalSettings.logo))}
                                className={classNames(styles.logo, 'ms-2')}
                                alt="logo"
                            />
                        )}
                    </Navbar.Brand>
                )}
            </div>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    {/* <Nav.Link as={Link} to="/inicio">
                            Inicio
                        </Nav.Link>
                        <Nav.Link as={Link} to="/ajustes">
                            Ajustes
                        </Nav.Link> */}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default AppNavbar
