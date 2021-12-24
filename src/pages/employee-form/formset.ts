import { TMachineryForm } from 'types/machinery'

export const employeeForm: TMachineryForm = {
    formsets: [
        {
            id: 'basicInfo',
            title: 'Información básica',
            fields: [
                {
                    inputKind: 'text',
                    name: 'firstName',
                    label: 'Nombre',
                    inputHTMLType: 'text',
                    required: true,
                    colProps: { xs: 12, md: 6 },
                },
                {
                    inputKind: 'text',
                    name: 'lastName',
                    label: 'Apellido',
                    inputHTMLType: 'text',
                    required: true,
                    colProps: { xs: 12, md: 6 },
                },
                {
                    inputKind: 'text',
                    name: 'identificationCardId',
                    label: 'Cédula',
                    inputHTMLType: 'text',
                    colProps: { xs: 12, md: 6 },
                },
            ],
        },
        {
            id: 'contactInfo',
            title: 'Información de contacto',
            fields: [
                {
                    inputKind: 'text',
                    name: 'phone',
                    label: 'Teléfono',
                    inputHTMLType: 'tel',
                    colProps: { xs: 12, md: 6 },
                },
            ],
        },
        {
            id: 'otherInfo',
            title: 'Otros',
            fields: [
                {
                    inputKind: 'text',
                    name: 'role',
                    label: 'Cargo',
                    inputHTMLType: 'text',
                    required: true,
                    colProps: { xs: 12, md: 6 },
                },
            ],
        },
        {
            id: 'photo',
            title: 'Foto',
            fields: [
                {
                    inputKind: 'file',
                    name: 'photo',
                    label: 'Foto',
                    colProps: { xs: 12, md: 6 },
                },
            ],
        },
    ],
}
