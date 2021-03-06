import { TMachinery } from './machinery'

export type TMaintenanceRegister = {
    id: number
    area: string
    code: string
    frequency: number
    machine: TMachinery | number
    activities: string
    date: string
    expectedDates: string[]
}

export type TMaintenanceRegisterPayload = {
    id: number
    data: Partial<TMaintenanceRegister>
}

export type TMaintenanceRegisterState = {
    loading: boolean
    error: boolean
    registers: TMaintenanceRegister[]
    currentMaintenance?: TMaintenanceRegister
}
