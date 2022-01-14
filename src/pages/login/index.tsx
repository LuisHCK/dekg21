import { ROUTER_PATHS } from 'app-constants/router-paths'
import React, { useEffect, useState } from 'react'
import { Card, Form, Button, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { AUTH_LOGIN } from 'store/actions/auth'
import { GET_AUTH_STATE } from 'store/selectors/auth'
import BackgroundImage from 'assets/img/login-bg.jpg'
import Logo from 'assets/img/logo.png'
import styles from './styles.module.scss'

type TFormData = {
    identifier: string
    password: string
    rememberMe: boolean
}

const LoginPage = (): React.ReactElement => {
    const [formData, setFormData] = useState<TFormData>({
        identifier: '',
        password: '',
        rememberMe: false,
    })
    const dispatch = useDispatch()
    const history = useHistory()
    const { loading, user } = useSelector(GET_AUTH_STATE)

    const handleInputChange = ({
        currentTarget: { name, value },
    }: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [name]: value })
    }

    const handleCheckBox = ({
        currentTarget: { name, checked },
    }: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [name]: checked })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        await dispatch(AUTH_LOGIN({ ...formData }))
    }

    useEffect(() => {
        if (user && !loading) {
            setTimeout(() => {
                history.push(ROUTER_PATHS.HOME.ROOT)
            }, 500)
        }
    }, [user, loading, history])

    return (
        <div className={styles.container} style={{ backgroundImage: `url(${BackgroundImage})` }}>
            <div className={styles.leftPanel}>
                <h1 className={styles.title}>DEK-G21</h1>
                <img src={Logo} className={styles.logo} alt="pattern" />
            </div>

            <Card className={styles.card}>
                <Card.Header>
                    <h1 className="size-3">Iniciar sesión</h1>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Escribe tu correo electrónico"
                                name="identifier"
                                value={formData.identifier}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Escribe tu contraseña"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="Mantener la sesión iniciada"
                                name="rememberMe"
                                onInput={handleCheckBox}
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={!formData.identifier && !formData.password}
                        >
                            {loading ? (
                                <Spinner animation="border" role="status" size="sm" />
                            ) : (
                                'Iniciar sesión'
                            )}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default LoginPage
