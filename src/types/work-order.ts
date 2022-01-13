import { TEmployee } from './employee'
import { TPart } from './inventory'
import { TMachinery } from './machinery'

export type TWorkOrderPartUsed = {
    _tempId?: number
    id?: number
    part: Partial<TPart>
    quantity: number
}

export type TWorkOrder = {
    id: number
    date: string
    area: string
    machine: TMachinery
    description: string
    partsUsed: string
    partUsed: TWorkOrderPartUsed[]
    cost: number
    employee: TEmployee
    datePrev: string
    observations?: string
    type: 'preventive' | 'corrective'
}

export type TWorkOrderPostBody = TWorkOrder & {
    id?: string | number
    machine: string | number
    employee: string | number
}

export type TWorkOrderState = {
    loading: boolean
    error: boolean
    workOrders?: TWorkOrder[]
    currentOrder?: TWorkOrder
}
