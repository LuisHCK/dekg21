import { get } from 'lodash'
import { TEmployee } from 'types/employee'
import { TPart } from 'types/inventory'
import { TFormSet, TMachinery } from 'types/machinery'
import { TWorkOrder } from 'types/work-order'

const defaultMachine = {
    disabled: true,
    key: '',
    label: 'Seleccione una máquina',
}

const defaultEmployee = {
    disabled: true,
    key: '',
    label: 'Seleccione un colaborador',
}

export const buildFormset = (
    machines: TMachinery[],
    employees: TEmployee[],
    parts?: TPart[],
    workOrder?: TWorkOrder,
): TFormSet => ({
    id: 'workOrder',
    title: 'Orden de trabajo',
    fields: [
        {
            name: 'date',
            nativeType: 'date',
            label: 'Fecha',
            required: true,
            value: get(workOrder, 'date'),
            className: 'col-xs-12 col-sm-6',
        },
        {
            name: 'area',
            nativeType: 'text',
            label: 'Area/Planta',
            required: true,
            value: get(workOrder, 'area'),
            className: 'col-xs-12 col-sm-6',
        },
        {
            name: 'machine',
            nativeType: 'select',
            label: 'Maquina',
            required: true,
            options: machines.map((machine) => ({ label: machine.name, key: machine.id })),
            value: get(workOrder, 'machine.id'),
            className: 'col-xs-12 col-sm-6',
        },
        {
            name: 'type',
            nativeType: 'select',
            label: 'Preventivo/Correctivo',
            value: get(workOrder, 'type') || 'preventive',
            options: [
                { key: 'preventive', label: 'Preventivo' },
                { key: 'corrective', label: 'Correctivo' },
            ],
            className: 'col-xs-12 col-sm-6',
        },
        {
            name: 'description',
            nativeType: 'textarea',
            label: 'Descripción de la actividad',
            required: true,
            value: get(workOrder, 'description'),
            className: 'col-xs-12 col-sm-12',
        },
        {
            name: 'partUsed',
            nativeType: 'component',
            label: 'Repuestos utilizados',
            value: get(workOrder, 'partUsed'),
            className: 'col-xs-12 col-sm-12',
            options: parts?.map((part) => ({
                key: part.id,
                label: `${part.name} - ${part.content}${part.unit}`,
            })),
        },
        {
            name: 'cost',
            nativeType: 'number',
            label: 'Costo',
            step: '0.1',
            value: get(workOrder, 'cost'),
            className: 'col-xs-12 col-sm-4',
        },
        {
            name: 'employee',
            nativeType: 'select',
            label: 'Técnico',
            options: employees.map((employee) => ({
                key: employee.id,
                label: `${employee.firstName} ${employee.lastName}`,
            })),
            value: get(workOrder, 'employee.id'),
            className: 'col-xs-12 col-sm-4',
        },
        {
            name: 'datePrev',
            nativeType: 'date',
            label: 'Fecha Prev.',
            disabled: true,
            value: get(workOrder, 'detePrev'),
            className: 'col-xs-12 col-sm-4',
        },
        {
            name: 'observations',
            nativeType: 'textarea',
            label: 'Observaciones',
            value: get(workOrder, 'observations'),
            className: 'col-xs-12 col-sm-12',
        },
    ],
})
