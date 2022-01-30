import { TAsset, TNodeAsset } from './asset'

export type TEmployee = {
    id: number
    firstName: string
    lastName: string
    identificationCardId: string | null
    phone: string | null
    role: string | null
    status: 'active' | 'inactive' | 'away' | 'fired'
    photo: TNodeAsset | string
    published_at: string
}

export type TEmployeeState = {
    loading: boolean
    error: boolean
    employees: TEmployee[]
    currentEmployee?: TEmployee
}
