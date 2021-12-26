import { TFormSet } from 'types/machinery'

type TEmployeeFormm = {
    formsets: TFormSet[]
}

export const EmployeeForm: TEmployeeFormm = {
    formsets: [
        {
            id: 'basicInfo',
            title: 'Información básica',
            fields: [
                {
                    inputHTMLType: 'text',
                    name: 'firstName',
                    required: true,
                    value: '',
                    label: 'Nombres',
                },
                {
                    inputHTMLType: 'text',
                    name: 'lastName',
                    required: true,
                    value: '',
                    label: 'Apellidos',
                },
                {
                    inputHTMLType: 'text',
                    name: 'identificationCardId',
                    value: '',
                    label: 'Cédula',
                },
                {
                    nativeType: 'file',
                    inputHTMLType: 'file',
                    name: 'photo',
                    label: 'Foto',
                },
            ],
        },
        {
            id: 'contactInfo',
            title: 'Información de contacto',
            fields: [
                {
                    inputHTMLType: 'tel',
                    name: 'phone',
                    label: 'Número telefónico',
                    value: '',
                },
            ],
        },
        {
            id: 'administrative',
            title: 'Administrativo',
            fields: [
                {
                    inputHTMLType: 'text',
                    name: 'role',
                    label: 'Rol',
                    value: '',
                },
                {
                    nativeType: 'select',
                    name: 'status',
                    label: 'Estatus',
                    options: [
                        { label: 'Activo', key: 'active' },
                        { label: 'Inactivo', key: 'inactive' },
                        { label: 'Ausente', key: 'away' },
                        { label: 'De baja', key: 'fired' },
                    ],
                },
            ],
        },
    ],
}
