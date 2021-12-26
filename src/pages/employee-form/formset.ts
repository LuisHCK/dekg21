import { TMachineryForm } from 'types/machinery'

export const employeeForm: TMachineryForm = {
    formsets: [
        {
            id: 'basicInfo',
            title: 'Información básica',
            fields: [
                {
                    nativeType: 'text',
                    name: 'firstName',
                    label: 'Nombre',
                    inputHTMLType: 'text',
                    required: true,
                    colProps: { xs: 12, md: 6 },
                },
                {
                    nativeType: 'text',
                    name: 'lastName',
                    label: 'Apellido',
                    inputHTMLType: 'text',
                    required: true,
                    colProps: { xs: 12, md: 6 },
                },
                {
                    nativeType: 'text',
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
                    nativeType: 'text',
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
                    nativeType: 'text',
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
                    nativeType: 'file',
                    name: 'photo',
                    label: 'Foto',
                    colProps: { xs: 12, md: 6 },
                },
            ],
        },
    ],
}
