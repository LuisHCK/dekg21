import React from 'react'
import { exportDatabase } from 'database'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import DatabaseImportButton from 'components/database-import'

const DatabaseBackup = (): React.ReactElement => {
    const handleExportDB = async () => {
        await exportDatabase()
        toast.success('Se realizó la copia de seguridad con éxito')
    }

    return (
        <div>
            <Button onClick={handleExportDB}>Exportar</Button>

            <DatabaseImportButton className="ms-2" />
        </div>
    )
}

export default DatabaseBackup
