import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

const AppNavbar = (): React.ReactElement => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className={styles.navbar}>
            <Container>
                <Navbar.Brand as={Link} to="/inicio">
                    Mantenimiento+
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/inicio">
                            Inicio
                        </Nav.Link>
                        <Nav.Link as={Link} to="/ajustes">
                            Ajustes
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AppNavbar
