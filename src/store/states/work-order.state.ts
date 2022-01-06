import { TWorkOrderState } from "types/work-order";

export const workOrderState: TWorkOrderState = {
    loading: false,
    error: false,
    workOrders: [],
    currentOrder: undefined
}
