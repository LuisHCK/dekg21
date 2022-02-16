import React, { useEffect, useState } from 'react'
import ContentForm from 'components/content-form'
import { get } from 'lodash'
import { TFormSet } from 'types/machinery'
import { formset } from './formset'
import { Button } from 'react-bootstrap'
import { flattenForm, formIsValid } from 'utils/services'
import { toast } from 'react-toastify'
import { createOrUpdateSettings, getSettingsByName } from 'backend/controllers/settings.controller'

const GeneralSettings = (): React.ReactElement => {
    const [formLoaded, setFormLoaded] = useState(false)
    const [formData, setFormData] = useState<TFormSet>(formset)

    const handleChange = (data: TFormSet) => {
        setFormData(data)
    }

    const onSave = async () => {
        if (formIsValid([formData])) {
            const value = flattenForm([formData])
            await createOrUpdateSettings({ name: 'general-settings', value })
                .then(() => toast.success('Se guardó con éxito'))
                .catch(() => toast.error('No se pudo guardar.\nPor favor revisa el formulario'))
        }

        toast.error('No se pudo guardar.\nPor favor revisa el formulario')
    }

    useEffect(() => {
        const getSettings = async () => {
            const settings = await getSettingsByName('general-settings')

            const updatedFields = formset.fields.map((field) => ({
                ...field,
                value: get(settings, field.name),
            }))

            setFormData({ ...formData, fields: updatedFields })
        }

        if (!formLoaded) {
            getSettings()
            setFormLoaded(true)
        }
    }, [formData, formLoaded])

    return (
        <div>
            <ContentForm form={formData} onChange={handleChange} hideTitle />
            <Button variant="primary" onClick={onSave}>
                Guardar
            </Button>
        </div>
    )
}

export default GeneralSettings
