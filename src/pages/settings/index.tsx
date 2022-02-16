import React, { useState } from 'react'
import PageTitle from 'components/page-title'
import { Tab, Tabs } from 'react-bootstrap'
import GeneralSettings from 'components/general-settings'
import DatabaseBackup from 'components/database-backup'

const SettingsPage = (): React.ReactElement => {
    const [key, setKey] = useState<string>('general')

    return (
        <div>
            <PageTitle title="Ajustes de la Aplicación" />

            <Tabs
                id="settings-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k || 'general')}
                className="mb-3"
            >
                <Tab eventKey="general" title="Datos generales">
                    <GeneralSettings />
                </Tab>
                {/* <Tab eventKey="users" title="Usuarios"></Tab> */}
                <Tab eventKey="database" title="Base de datos">
                    <DatabaseBackup />
                </Tab>
            </Tabs>
        </div>
    )
}

export default SettingsPage
