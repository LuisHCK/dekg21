import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import API_ROUTES from 'app-constants/api-routes'
import HTTPClient from 'utils/http-client'
import { AxiosResponse } from 'axios'
import { TMaintenanceRegister, TMaintenanceRegisterPayload } from 'types/maintenance-register'

export const GET_MAINTENANCE_REGISTERS = createAsyncThunk(
    'MAINTENANCE-REGISTER/GET_MAINTENANCE_REGISTERS',
    async () => {
        const response = await HTTPClient.get<TMaintenanceRegister[]>(
            API_ROUTES.MAINTENANCE_REGISTER.ROOT,
        )
        return response.data
    },
)

export const GET_CURRENT_MAINTENANCE_REGISTER = createAsyncThunk(
    'MAINTENANCE-REGISTER/GET_CURRENT_MAINTENANCE_REGISTER',
    async ({ id }: TMaintenanceRegisterPayload) => {
        const response = await HTTPClient.get<TMaintenanceRegister>(
            API_ROUTES.MAINTENANCE_REGISTER.BY_ID(id),
        )
        return response.data
    },
)

export const CREATE_MAINTENANCE_REGISTER = createAsyncThunk(
    'MAINTENANCE-REGISTER/CREATE_MAINTENANCE_REGISTER',
    async ({ data }: Partial<TMaintenanceRegisterPayload>) => {
        const response = await HTTPClient.post<
            Partial<TMaintenanceRegister>,
            AxiosResponse<TMaintenanceRegister>
        >(API_ROUTES.MAINTENANCE_REGISTER.ROOT, data)

        return response.data
    },
)

export const UPDATE_MAINTENANCE_REGISTER = createAsyncThunk(
    'MAINTENANCE-REGISTER/UPDATE_MAINTENANCE_REGISTER',
    async ({ id, data }: TMaintenanceRegisterPayload) => {
        const response = await HTTPClient.put<
            Partial<TMaintenanceRegister>,
            AxiosResponse<TMaintenanceRegister>
        >(API_ROUTES.MAINTENANCE_REGISTER.BY_ID(id), data)

        return response.data
    },
)

export const CLEAN_CURRENT_MAINTENANCE_REGISTER = createAction(
    'MAINTENANCE-REGISTER/CLEAN_CURRENT_MAINTENANCE_REGISTER',
)
