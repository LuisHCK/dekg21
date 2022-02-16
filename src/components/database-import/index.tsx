import React, { useRef } from 'react'
import { importDatabase } from 'database'
import { Button } from 'react-bootstrap'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import { ROUTER_PATHS } from 'app-constants/router-paths'

type TProps = {
    className?: string
}

const DatabaseImportButton = ({ className }: TProps): React.ReactElement => {
    const history = useHistory()
    const inputRef = useRef<HTMLInputElement>(null)

    const handleOnClick = () => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    const handleImportDB = async ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = currentTarget.files

        if (fileList && fileList.length) {
            const file = fileList[0]
            const confirmed = window.confirm(
                'ADVERTENCIA\nAl importar se reemplazarán todos los datos existentes',
            )

            if (file && confirmed) {
                await importDatabase(file)
                toast.success('Se completó la importación de la base de datos')
                history.push(ROUTER_PATHS.LOGOUT)
            }
        }
    }

    return (
        <>
            <Button className={classNames(className)} variant="info" onClick={handleOnClick}>
                Importar copia de seguridad
            </Button>
            <input
                ref={inputRef}
                className="d-none"
                type="file"
                id="formFile"
                onChange={handleImportDB}
            />
        </>
    )
}

DatabaseImportButton.defaultProps = {
    className: undefined,
}

export default DatabaseImportButton
