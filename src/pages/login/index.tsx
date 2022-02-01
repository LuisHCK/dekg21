import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'

import { ROUTER_PATHS } from 'app-constants/router-paths'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { AUTH_LOGIN, AUTH_REGISTER } from 'store/actions/auth'
import { GET_ALL_USERS } from 'store/actions/user.actions'
import { GET_AUTH_STATE } from 'store/selectors/auth'
import { SELECT_ALL_USERS } from 'store/selectors/users.selector'

import BackgroundImage from 'assets/img/login-bg.jpg'
import Logo from 'assets/img/logo.png'
import styles from './styles.module.scss'
import LoginForm from 'components/login-form'
import { TFormData } from 'types/user'
import { toast } from 'react-toastify'

const LoginPage = (): React.ReactElement => {
    const [formData, setFormData] = useState<TFormData>({
        identifier: '',
        password: '',
        rememberMe: false,
    })
    const dispatch = useDispatch()
    const history = useHistory()
    const { loading, error, user } = useSelector(GET_AUTH_STATE)
    const allUsers = useSelector(SELECT_ALL_USERS)

    const isRegister = !allUsers?.length

    const handleInputChange = ({
        currentTarget: { name, value },
    }: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!formData.identifier || !formData.password) {
            return toast.error('Por completa el formulario', { position: 'top-right' })
        }

        if (isRegister) {
            dispatch(AUTH_REGISTER(formData))
        } else {
            dispatch(AUTH_LOGIN({ ...formData }))
        }

        dispatch(GET_ALL_USERS())
    }

    useEffect(() => {
        if (user && !loading) {
            history.push(ROUTER_PATHS.HOME.ROOT)
            toast.success(`Bienvenido ${user.firstName} ${user.lastName}`, {
                position: 'top-right',
            })
        }
    }, [user, loading, history])

    useEffect(() => {
        if (!loading && error && !user) {
            toast.error('Usuario o contraseña incorrectos', { position: 'top-right' })
        }
    }, [error, loading, user])

    useEffect(() => {
        dispatch(GET_ALL_USERS())
    }, [dispatch])

    return (
        <div className={styles.container} style={{ backgroundImage: `url(${BackgroundImage})` }}>
            <div className={styles.leftPanel}>
                <h1 className={styles.title}>DEK-G21</h1>
                <img src={Logo} className={styles.logo} alt="pattern" />
            </div>

            <Card className={styles.card}>
                <Card.Header>
                    <h1 className="size-3">{isRegister ? 'Crear usuario' : 'Iniciar sesión'}</h1>
                </Card.Header>
                <Card.Body>
                    <LoginForm
                        isRegister={isRegister}
                        formData={formData}
                        handleSubmit={handleSubmit}
                        handleInputChange={handleInputChange}
                        loading={loading}
                    />
                </Card.Body>
            </Card>
        </div>
    )
}

export default LoginPage
