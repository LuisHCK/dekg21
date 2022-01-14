import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getAppName } from 'utils/services'
import Logo from 'assets/img/logo.png'
import styles from './styles.module.scss'

const AppNavbar = (): React.ReactElement => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className={styles.navbar}>
            <Navbar.Brand as={Link} to="/inicio" className={styles.brand}>
                <img src={Logo} className={styles.logo} alt="logo" />
                {getAppName()}
            </Navbar.Brand>

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
