import { TMachineryForm } from 'types/machinery'

const machineForm: TMachineryForm = {
    formsets: [
        {
            className: '',
            id: 'basicInfo',
            title: 'Información básica',
            fields: [
                {
                    nativeType: 'text',
                    name: 'name',
                    label: 'Nombre',
                    inputHTMLType: 'text',
                    required: true,
                    colProps: { xs: 12, md: 6 },
                },
                {
                    nativeType: 'text',
                    renderAs: 'textarea',
                    name: 'description',
                    label: 'Descripción',
                    required: true,
                    colProps: { xs: 12, md: 12 },
                },
            ],
        },

        {
            className: '',
            id: 'technicalData',
            title: 'Información Técnica',
            fields: [
                {
                    nativeType: 'text',
                    name: 'brand',
                    label: 'Marca',
                    inputHTMLType: 'text',
                    colProps: { xs: 12, md: 6 },
                },
                {
                    nativeType: 'text',
                    name: 'model',
                    label: 'Modelo',
                    inputHTMLType: 'text',
                    colProps: { xs: 12, md: 6 },
                },
                {
                    nativeType: 'text',
                    name: 'power',
                    label: 'Potencia',
                    inputHTMLType: 'text',
                    placeholder: 'HP',
                    colProps: { xs: 12, md: 6 },
                },
                {
                    nativeType: 'text',
                    name: 'productivity',
                    label: 'Productividad',
                    inputHTMLType: 'text',
                    colProps: { xs: 12, md: 6 },
                },
                {
                    nativeType: 'text',
                    name: 'voltage',
                    label: 'Voltaje',
                    placeholder: 'Voltios',
                    inputHTMLType: 'text',
                    colProps: { xs: 12, md: 6 },
                },
                {
                    nativeType: 'text',
                    name: 'supply',
                    label: 'Suministro',
                    placeholder: 'Tipo de suministro eléctrico',
                    inputHTMLType: 'text',
                    colProps: { xs: 12, md: 6 },
                },
                {
                    nativeType: 'text',
                    name: 'lifespan',
                    label: 'Vida útil',
                    inputHTMLType: 'text',
                    placeholder: 'Horas, años',
                    colProps: { xs: 12, md: 6 },
                },
                {
                    nativeType: 'text',
                    name: 'weightKg',
                    label: 'Peso/Kg',
                    inputHTMLType: 'text',
                    placeholder: 'Toneladas, Kg, etc.',
                    colProps: { xs: 12, md: 6 },
                },
                {
                    nativeType: 'text',
                    name: 'installationRequirements',
                    label: 'Para su instlación requiere',
                    renderAs: 'textarea',
                    colProps: { xs: 12, md: 6 },
                },
                {
                    nativeType: 'text',
                    name: 'electricityConsumptionKw',
                    label: "Consumo específico de energía - Kw/h"
                }
            ],
        },
        {
            id: 'runningCost',
            className: '',
            title: 'Costos de operación',
            fields: [
                {
                    nativeType: 'text',
                    name: 'electricityCostKw',
                    label: 'Costo de electricidad - Kw/h',
                    colProps: { xs: 12, md: 6 },
                },
                {
                    nativeType: 'text',
                    name: 'spareParts',
                    label: 'Repuestos que utiliza',
                    colProps: { xs: 12, md: 6 },
                },
                {
                    nativeType: 'text',
                    name: 'supplies',
                    label: 'Insumos que requiere',
                    colProps: { xs: 12, md: 6 },
                },
                {
                    nativeType: 'text',
                    name: 'laborRequired',
                    label: 'Mano de obra necesaria',
                    colProps: { xs: 12, md: 6 },
                },
            ],
        },
        {
            id: 'recommendations',
            title: 'Recomendaciones',
            fields: [
                {
                    nativeType: 'text',
                    renderAs: 'textarea',
                    name: 'laborRequired',
                    label: 'Mano de obra necesaria',
                    required: true,
                    colProps: { xs: 12, md: 12 },
                },
            ],
        },
        {
            id: 'supplier',
            title: 'Donde se puede comprar',
            fields: [
                {
                    nativeType: 'text',
                    name: 'supplierName',
                    label: 'Empresa que comercializa',
                    required: true,
                    colProps: { xs: 12, md: 6 },
                },
                {
                    nativeType: 'text',
                    name: 'approximateCost',
                    label: 'Costo aproximado',
                    colProps: { xs: 12, md: 6 },
                },
                {
                    nativeType: 'text',
                    name: 'warrantyYrs',
                    label: 'Garantía/Años',
                    colProps: { xs: 12, md: 6 },
                },
                {
                    nativeType: 'text',
                    name: 'storeAddress',
                    label: 'Dirección de la tienda',
                    colProps: { xs: 12, md: 6 },
                },
                {
                    nativeType: 'text',
                    name: 'phones',
                    label: 'Teléfonos',
                    placeholder: 'Separados por coma',
                    colProps: { xs: 12, md: 6 },
                },
                {
                    nativeType: 'text',
                    name: 'email',
                    label: 'Correos',
                    placeholder: 'Separados por coma',
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

export default machineForm
