import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import API_ROUTES from 'app-constants/api-routes'
import HTTPClient from 'utils/http-client'
import { TPart } from 'types/inventory'
import { AxiosResponse } from 'axios'

type TParams = {
    id: number
    data?: TPart
}

export const GET_ALL_PARTS = createAsyncThunk('INVENTORY/GET_ALL_PRODUCTS', async () => {
    const response = await HTTPClient.get<TPart[]>(API_ROUTES.PARTS.ROOT)
    return response.data
})

export const GET_CURRENT_PART = createAsyncThunk(
    'INVENTORY/GET_CURRENT_PART',
    async ({ id }: TParams) => {
        const response = await HTTPClient.get<TPart>(API_ROUTES.PARTS.BY_ID(id))
        return response.data
    },
)

export const CREATE_PART = createAsyncThunk('INVENTORY/CREATE_PART', async ({ data }: TParams) => {
    const response = await HTTPClient.post<Partial<TPart>, AxiosResponse<TPart>>(
        API_ROUTES.PARTS.ROOT,
        data,
    )
    return response.data
})

export const TOGGLE_PART_FORM = createAction('INVENTORY/TOGGLE_PART_FORM')

export const CLEAN_CURRENT_PART = createAction('INVENTORY/CLEAN_CURRENT_PART')
