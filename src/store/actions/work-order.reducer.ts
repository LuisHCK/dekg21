import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import API_ROUTES from 'app-constants/api-routes'
import { AxiosResponse } from 'axios'
import { TWorkOrder, TWorkOrderPostBody } from 'types/work-order'
import HTTPClient from 'utils/http-client'

type TPayload = {
    id: number
    data?: TWorkOrderPostBody
}

export const GET_WORK_ORDERS = createAsyncThunk('WORK_ORDER/GET_WORK_ORDERS', async () => {
    const response = await HTTPClient.get<TWorkOrder[]>(API_ROUTES.WORK_ORDER.ROOT)
    return response.data
})

export const GET_CURRENT_WORK_ORDER = createAsyncThunk(
    'WORK_ORDER/GET_CURRENT_WORK_ORDER',
    async ({ id }: TPayload) => {
        const response = await HTTPClient.get<TWorkOrder>(API_ROUTES.WORK_ORDER.BY_ID(id))
        return response.data
    },
)

export const CREATE_WORK_ORDER = createAsyncThunk(
    'WORK_ORDER/CREATE_WORK_ORDER',
    async ({ data }: Partial<TPayload>) => {
        const response = await HTTPClient.post<
            Partial<TWorkOrderPostBody>,
            AxiosResponse<TWorkOrder>
        >(API_ROUTES.WORK_ORDER.ROOT, data)

        return response.data
    },
)

export const UPDATE_WORK_ORDER = createAsyncThunk(
    'WORK_ORDER/UPDATE_WORK_ORDER',
    async ({ id, data }: TPayload) => {
        const response = await HTTPClient.put(API_ROUTES.WORK_ORDER.BY_ID(id), data)
        return response.data
    },
)

export const CLEAN_CURRENT_WORK_ORDER = createAction('WORK_ORDER/CLEAN_CURRENT_WORK_ORDER')
