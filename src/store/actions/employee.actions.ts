import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import {
    createEmployee,
    listEmployees,
    showEmployee,
    updateEmploye,
} from 'backend/controllers/employee.controller'
import { TEmployee } from 'types/employee'

type TEmployeePayload = {
    id: number
    data: Partial<TEmployee>
}

export const GET_ALL_EMPLOYEES = createAsyncThunk('EMPLOYEES/GET_ALL_EMPLOYEES', async () => {
    const response = await listEmployees()
    return response
})

export const CREATE_EMPLOYEE = createAsyncThunk(
    'EMPLOYEES/CREATE_EMPLOYEE',
    async (payload: Partial<TEmployeePayload>) => {
        const response = await createEmployee(payload.data)
        return response
    },
)

export const UPDATE_EMPLOYEE = createAsyncThunk(
    'EMPLOYEES/UPDATE_EMPLOYEE',
    async (payload: TEmployeePayload) => {
        const response = await updateEmploye(payload.id, payload.data)
        return response
    },
)

export const GET_CURRENT_EMPLOYEE = createAsyncThunk(
    'EMPLOYEES/SET_EMPLOYEE_FORM',
    async ({ id }: Partial<TEmployeePayload>) => {
        const response = await showEmployee(id || 0)
        return response
    },
)

export const CLEAN_CURRENT_EMPLOYEE = createAction('EMPLOYEES/CLEAN_CURRENT_EMPLOYEE')
