import React from 'react'
import DatabaseImportButton from 'components/database-import'
import { Button, Form, Spinner } from 'react-bootstrap'
import { TFormData } from 'types/user'

interface IProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    formData: TFormData
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    loading: boolean
    isRegister?: boolean
}

const LoginForm = ({ handleSubmit, formData, handleInputChange, loading, isRegister }: IProps) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Escribe tu correo electrónico"
                    name="identifier"
                    value={formData.identifier}
                    onChange={handleInputChange}
                    required
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
                    required
                />
            </Form.Group>
            <Button
                variant="primary"
                type="submit"
                disabled={!formData.identifier && !formData.password}
                className="mr-2"
            >
                {loading ? (
                    <Spinner animation="border" role="status" size="sm" />
                ) : isRegister ? (
                    'Crear usuario'
                ) : (
                    'Iniciar sesión'
                )}
            </Button>

            <DatabaseImportButton className="ms-2" />
        </Form>
    )
}

LoginForm.defaultProps = {
    isRegister: false,
}

export default LoginForm
