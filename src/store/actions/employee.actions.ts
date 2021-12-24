import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import API_ROUTES from 'app-constants/api-routes'
import { AxiosResponse } from 'axios'
import { TEmployee } from 'types/employee'
import HTTPClient from 'utils/http-client'

type TEmployeePayload = {
    id: number | string
    data: Partial<TEmployee>
}

export const GET_ALL_EMPLOYEES = createAsyncThunk('EMPLOYEES/GET_ALL_EMPLOYEES', async () => {
    const response = await HTTPClient.get<TEmployee[]>(API_ROUTES.EMPLOYEES.ROOT)
    return response.data
})

export const CREATE_EMPLOYEE = createAsyncThunk(
    'EMPLOYEES/CREATE_EMPLOYEE',
    async (payload: Partial<TEmployeePayload>) => {
        const response = await HTTPClient.post<Partial<TEmployee>, AxiosResponse<TEmployee>>(
            API_ROUTES.EMPLOYEES.ROOT,
            payload.data,
        )

        return response.data
    },
)

export const UPDATE_EMPLOYEE = createAsyncThunk(
    'EMPLOYEES/UPDATE_EMPLOYEE',
    async (payload: TEmployeePayload) => {
        const response = await HTTPClient.put<Partial<TEmployee>, AxiosResponse<TEmployee>>(
            API_ROUTES.EMPLOYEES.BY_ID(payload.id),
            payload.data,
        )

        return response.data
    },
)

export const GET_CURRENT_EMPLOYEE = createAsyncThunk(
    'EMPLOYEES/SET_EMPLOYEE_FORM',
    async ({ id }: Partial<TEmployeePayload>) => {
        const response = await HTTPClient.get<String, AxiosResponse<TEmployee>>(
            API_ROUTES.EMPLOYEES.BY_ID(id || 0),
        )

        return response.data
    },
)

export const CLEAN_CURRENT_EMPLOYEE = createAction('EMPLOYEES/CLEAN_CURRENT_EMPLOYEE')
