import { AsyncThunk, createAction, createAsyncThunk } from '@reduxjs/toolkit'
import API_ROUTES from 'app-constants/api-routes'
import { AxiosResponse } from 'axios'
import { TMachinery } from 'types/machinery'
import HTTPClient from 'utils/http-client'

export const GET_MACHINERY = createAsyncThunk('MACHINERY/GET_MACHINERY', async () => {
    const response = await HTTPClient.get<TMachinery[]>(API_ROUTES.MACHINERY.ROOT)
    return response.data
})

export const SET_CURRENT_MACHINE = createAsyncThunk(
    'MACHINERY/GET_CURRENT_MACHINE',
    async (payload: number) => {
        const response = await HTTPClient.get<TMachinery>(API_ROUTES.MACHINERY.BY_ID(payload))
        return response.data
    },
)

export const SET_MACHINERY_FORM = createAction<Partial<TMachinery>>('MACHINERY/SET_MACHINERY_FORM')

export const SUBMIT_MACHINERY_FORM = createAsyncThunk(
    'MACHINERY/SUBMIT_MACHINERY_FORM',
    async (payload: Partial<TMachinery>) => {
        const response = await HTTPClient.post<Partial<TMachinery>, AxiosResponse<TMachinery>>(
            API_ROUTES.MACHINERY.ROOT,
            payload,
        )
        return response.data
    },
)

export const UPDATE_MACHINERY_FORM: AsyncThunk<
    TMachinery,
    Partial<TMachinery>,
    {}
> = createAsyncThunk('MACHINERY/UPDATE_MACHINERY_FORM', async (payload: Partial<TMachinery>) => {
    const response = await HTTPClient.put<Partial<TMachinery>, AxiosResponse<TMachinery>>(
        API_ROUTES.MACHINERY.BY_ID(payload.id),
        payload,
    )

    return response.data
})
