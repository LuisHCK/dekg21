import { TMachineryForm } from 'types/machinery'

const currentDate = new Date().toISOString().split('T')[0]

const formset: TMachineryForm = {
    formsets: [
        {
            id: 'maintenance-register',
            title: 'Registro de mantenimiento',
            fields: [
                {
                    nativeType: 'date',
                    name: 'date',
                    label: 'Fecha',
                    required: true,
                    value: currentDate,
                    className: 'col-xs-6 col-sm-6',
                },
                {
                    nativeType: 'text',
                    name: 'area',
                    label: 'Area/Planta',
                    required: true,
                    value: '',
                    className: 'col-xs-6 col-sm-6',
                },
                {
                    nativeType: 'text',
                    name: 'code',
                    label: 'Código',
                    required: true,
                    value: '',
                    className: 'col-xs-12 col-md-6',
                },
                {
                    nativeType: 'number',
                    name: 'frequency',
                    label: 'Frecuencia',
                    placeholder: 'Frecuencia en dias',
                    required: true,
                    value: '',
                    min: 1,
                    className: 'col-xs-12 col-md-6',
                },
                {
                    nativeType: 'select',
                    name: 'machine',
                    label: 'Maquina',
                    required: true,
                    value: '',
                    className: 'col-xs-12 col-md-6',
                    options: [],
                },
                {
                    nativeType: 'textarea',
                    name: 'activities',
                    label: 'Actividades',
                    value: '',
                    className: 'col-xs-12 col-md-6',
                    rows: 8,
                },
            ],
        },
    ],
}

export default formset
