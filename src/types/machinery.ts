import { ElementType, HTMLInputTypeAttribute } from 'react'
import { ColProps } from 'react-bootstrap'
import { TAsset } from './asset'

export type TMachinery = {
    id: number
    name: string
    description: string
    brand: string
    model: string
    power: string
    productivity: string
    supply: string
    lifespan: string
    installationRequirements: string
    electricityKW: string
    spareParts: string
    supplies: string
    laborRequired: string
    recommendations: string
    supplier: string
    approximateCost: {
        key: string
        value: string
    }
    warrantyYrs: number
    storeAddress: string
    phones: string
    email: string
    weightKG: string
    voltages: string
    photo: TAsset | number
}

export type TMachineryState = {
    loading: boolean
    error: boolean
    machines: TMachinery[]
    machineryForm: Partial<TMachinery> | null
    currentMachine: TMachinery | null
}

export type TFormField = {
    className?: string
    name: string
    label: string
    inputHTMLType?: HTMLInputTypeAttribute
    renderAs?: 'input' | 'textarea' | ElementType
    inputKind?: 'text' | 'check' | 'range' | 'select' | 'file'
    required?: boolean
    placeholder?: string
    value?: string | number
    min?: number
    max?: number
    disabled?: boolean
    hidden?: boolean
    options?: { key: string; label: string }[]
    colProps?: ColProps
}

export type TFormSet = {
    id: string | number
    className?: string
    title: string
    fields: TFormField[]
}

export type TMachineryForm = {
    formsets: TFormSet[]
}
