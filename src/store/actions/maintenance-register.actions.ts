import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { TMaintenanceRegisterPayload } from 'types/maintenance-register'
import {
    createMaintenanceRegister,
    listMaintenanceRegisters,
    showMaintenanceRegister,
    updateMaintenanceRegister,
} from 'backend/controllers/maintenance-register.controller'

export const GET_ALL_MAINTENANCE_REGISTERS = createAsyncThunk(
    'MAINTENANCE-REGISTER/GET_MAINTENANCE_REGISTERS',
    async () => {
        const response = await listMaintenanceRegisters()
        return response
    },
)

export const GET_CURRENT_MAINTENANCE_REGISTER = createAsyncThunk(
    'MAINTENANCE-REGISTER/GET_CURRENT_MAINTENANCE_REGISTER',
    async ({ id }: Partial<TMaintenanceRegisterPayload>) => {
        const response = await showMaintenanceRegister(id || 0)
        return response
    },
)

export const CREATE_MAINTENANCE_REGISTER = createAsyncThunk(
    'MAINTENANCE-REGISTER/CREATE_MAINTENANCE_REGISTER',
    async ({ data }: Partial<TMaintenanceRegisterPayload>) => {
        const response = await createMaintenanceRegister(data || {})

        return response
    },
)

export const UPDATE_MAINTENANCE_REGISTER = createAsyncThunk(
    'MAINTENANCE-REGISTER/UPDATE_MAINTENANCE_REGISTER',
    async ({ id, data }: TMaintenanceRegisterPayload) => {
        const response = await updateMaintenanceRegister(id, data)

        return response
    },
)

export const CLEAN_CURRENT_MAINTENANCE_REGISTER = createAction(
    'MAINTENANCE-REGISTER/CLEAN_CURRENT_MAINTENANCE_REGISTER',
)
