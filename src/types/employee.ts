import { TAsset } from './asset'

export type TEmployee = {
    id: string
    firstName: string
    lastName: string
    identificationCardId: string | null
    phone: string | null
    role: string | null
    status: 'active' | 'inactive' | 'away' | 'fired'
    photo: TAsset | null
    published_at: string
}

export type TEmployeeState = {
    loading: boolean
    error: boolean
    employees: TEmployee[]
    currentEmployee?: TEmployee
}
