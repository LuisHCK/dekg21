export type TPart = {
    id: number
    name: string
    brand: string
    content: string
    unit: string
    codebar?: string
    price: number
    stock: number
}

export type TInventoryState = {
    loading: boolean
    error: boolean
    showForm: boolean
    parts?: TPart[]
    currentPart?: TPart
}
