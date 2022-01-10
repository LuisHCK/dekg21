import { TInventoryState } from 'types/inventory'

export const inventoryState: TInventoryState = {
    loading: false,
    error: false,
    showForm: false,
    parts: [],
    currentPart: undefined,
}
