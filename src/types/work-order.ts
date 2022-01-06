import { TEmployee } from './employee'
import { TMachinery } from './machinery'

export type TWorkOrder = {
    id: number
    date: string
    area: string
    machine: TMachinery
    description: string
    partsUsed: string
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
