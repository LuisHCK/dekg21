import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import {
    createWorkOrder,
    listWorkOrders,
    showWorkOrder,
    updateWorkOrder,
} from 'backend/controllers/work-order.controller'
import { TWorkOrderPostBody } from 'types/work-order'

type TPayload = {
    id: number
    data?: TWorkOrderPostBody
}

export const GET_WORK_ORDERS = createAsyncThunk('WORK_ORDER/GET_WORK_ORDERS', async () => {
    const response = await listWorkOrders()
    return response
})

export const GET_CURRENT_WORK_ORDER = createAsyncThunk(
    'WORK_ORDER/GET_CURRENT_WORK_ORDER',
    async ({ id }: TPayload) => {
        const response = await showWorkOrder(id)
        return response
    },
)

export const CREATE_WORK_ORDER = createAsyncThunk(
    'WORK_ORDER/CREATE_WORK_ORDER',
    async ({ data }: Partial<TPayload>) => {
        const response = await createWorkOrder(data || {})

        return response
    },
)

export const UPDATE_WORK_ORDER = createAsyncThunk(
    'WORK_ORDER/UPDATE_WORK_ORDER',
    async ({ id, data }: TPayload) => {
        const response = await updateWorkOrder(id, data || {})
        return response
    },
)

export const CLEAN_CURRENT_WORK_ORDER = createAction('WORK_ORDER/CLEAN_CURRENT_WORK_ORDER')
