import { get } from 'lodash'
import { TPart } from 'types/inventory'
import { TFormSet } from 'types/machinery'

export const buildFormset = (part?: TPart): TFormSet => ({
    id: 'inventory-part-formset',
    title: 'Parte',
    fields: [
        {
            name: 'name',
            nativeType: 'text',
            required: true,
            value: get(part, 'name') || '',
            label: 'Nombre',
            className: 'col-xs-12 col-sm-6',
        },
        {
            name: 'brand',
            nativeType: 'text',
            required: true,
            value: get(part, 'name') || '',
            label: 'Marca',
            className: 'col-xs-12 col-sm-6',
        },
        {
            name: 'content',
            nativeType: 'text',
            value: get(part, 'content') || '',
            label: 'Contenido',
            className: 'col-xs-12 col-sm-6',
        },
        {
            name: 'unit',
            nativeType: 'text',
            value: get(part, 'unit') || '',
            label: 'Unidad',
            placeholder: 'Kg, lb',
            className: 'col-xs-12 col-sm-6',
        },
        {
            name: 'price',
            nativeType: 'number',
            required: true,
            value: get(part, 'price') || 0,
            label: 'Precio',
            placeholder: 'C$',
            min: 0,
            className: 'col-xs-12 col-sm-6',
        },
        {
            name: 'stock',
            nativeType: 'number',
            required: true,
            value: get(part, 'stock') || 0,
            label: 'Existencias',
            min: 0,
            className: 'col-xs-12 col-sm-6',
        },
    ],
})
