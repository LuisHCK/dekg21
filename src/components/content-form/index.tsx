import React, { useMemo } from 'react'
import classNames from 'classnames'
import Select from 'react-select'
import { Alert, Col, Form, Row } from 'react-bootstrap'
import { TFormField, TFormSet } from 'types/machinery'
import { assetUpload } from 'utils/services'

type HTMLInputElements = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

type TProps = {
    form: TFormSet
    onChange: (form: TFormSet) => void
    hideTitle?: boolean
    renderOnly?: { from: number; to: number }
}

type TChangeProps = {
    name: string
    label?: string | undefined
    value?: string | number
}

const ContentForm = ({ form, onChange, hideTitle, renderOnly }: TProps): React.ReactElement => {
    const handleInputChange = ({
        currentTarget: { name, value },
    }: React.ChangeEvent<HTMLInputElements>) => {
        onChange({ ...form, fields: insertFields(name, value) })
    }

    const handleSelectChange = ({ name, value }: TChangeProps) => {
        onChange({ ...form, fields: insertFields(name, value || '') })
    }

    const handleInputFileChange = async ({
        currentTarget,
    }: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = currentTarget.files

        if (fileList && fileList.length) {
            const filesResponse = await assetUpload(fileList[0])
            if (filesResponse?.length) {
                onChange({ ...form, fields: insertFields(currentTarget.name, filesResponse[0].id) })
            }
        }
    }

    const insertFields = (name: string, value: string | number) => {
        const updatedFields: TFormField[] = form.fields.map((field) => {
            if (field.name === name) {
                return { ...field, value }
            }

            return field
        })
        return updatedFields
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    const renderInputField = (field: TFormField) => {
        switch (field.nativeType) {
            case 'text':
                return (
                    <Form.Control
                        type={field.inputHTMLType}
                        placeholder={field.placeholder}
                        value={field.value || ''}
                        name={field.name}
                        className={field.className}
                        required={field.required}
                        as={field.renderAs}
                        onChange={handleInputChange}
                    />
                )
            case 'number':
                return (
                    <Form.Control
                        type={field.nativeType}
                        placeholder={field.placeholder}
                        value={field.value || ''}
                        name={field.name}
                        className={field.className}
                        required={field.required}
                        as={field.renderAs}
                        onChange={handleInputChange}
                        min={field.min}
                        max={field.max}
                    />
                )
            case 'textarea':
                return (
                    <Form.Control
                        type={field.inputHTMLType}
                        placeholder={field.placeholder}
                        value={field.value || ''}
                        name={field.name}
                        className={field.className}
                        required={field.required}
                        as="textarea"
                        onChange={handleInputChange}
                        rows={field.rows}
                    />
                )
            case 'check':
                return (
                    <Form.Check
                        aria-label={field.label}
                        value={field.value || ''}
                        required={field.required}
                        name={field.name}
                        className={field.className}
                    />
                )

            case 'select':
                const options = field.options?.map((opt) => ({
                    value: opt.key,
                    label: opt.label,
                }))
                return (
                    <Select
                        options={options}
                        placeholder={field.placeholder}
                        name={field.name}
                        value={options?.find((opt) => opt.value === field.value)}
                        onChange={(opt) => handleSelectChange({ name: field.name, ...opt })}
                        noOptionsMessage={({ inputValue }) =>
                            !inputValue ? 'Buscar' : 'No hay resultados'
                        }
                    />
                )
            case 'range':
                return (
                    <Form.Range
                        min={field.min}
                        max={field.max}
                        value={field.value || ''}
                        required={field.required}
                        className={field.className}
                    />
                )
            case 'file':
                return (
                    <Form.Control
                        type="file"
                        name={field.name}
                        required={field.required}
                        className={field.className}
                        onChange={handleInputFileChange}
                    />
                )
            case 'date':
                return (
                    <Form.Control
                        type={field.nativeType}
                        placeholder={field.placeholder}
                        value={field.value || ''}
                        name={field.name}
                        className={field.className}
                        required={field.required}
                        as={field.renderAs}
                        onChange={handleInputChange}
                        min={field.min}
                        max={field.max}
                    />
                )

            default:
                return (
                    <Alert variant="danger">
                        <Alert.Heading>Campo inválido</Alert.Heading>
                        <p>
                            No se ha podido mostrar el campo correctamente, por favor pongase en
                            contacto con el administrador del sistema
                        </p>
                    </Alert>
                )
        }
    }

    const fields = useMemo<TFormField[]>(() => {
        if (renderOnly) {
            return form.fields.slice(renderOnly.from, renderOnly.to)
        }

        return form.fields
    }, [form, renderOnly])

    return (
        <Form onSubmit={handleSubmit}>
            {!hideTitle && (
                <>
                    <h4>{form.title}</h4>
                    <hr />
                </>
            )}

            <Row>
                {fields.map((field) => (
                    <Form.Group
                        key={`${form.id}-field-${field.name}`}
                        className={classNames('mb-3', field.className)}
                        controlId={field.name}
                        as={Col}
                        {...field.colProps}
                    >
                        <Form.Label>
                            {field.label}
                            {field.required ? '*' : null}
                        </Form.Label>
                        {renderInputField(field)}
                    </Form.Group>
                ))}
            </Row>
        </Form>
    )
}

ContentForm.defaultProps = {
    hideTitle: false,
    renderOnly: undefined,
}

export default ContentForm
