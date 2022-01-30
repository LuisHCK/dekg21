import { AsyncThunk, createAction, createAsyncThunk } from '@reduxjs/toolkit'
import {
    createMachine,
    listMachinery,
    showMachinery,
    updateMachine,
} from 'backend/controllers/machinery.controller'
import { TMachinery } from 'types/machinery'

export const GET_MACHINERY = createAsyncThunk('MACHINERY/GET_MACHINERY', async () => {
    const response = await listMachinery()
    return response
})

export const SET_CURRENT_MACHINE = createAsyncThunk(
    'MACHINERY/GET_CURRENT_MACHINE',
    async (payload: number) => {
        const response = await showMachinery(payload)
        return response
    },
)

export const SET_MACHINERY_FORM = createAction<Partial<TMachinery>>('MACHINERY/SET_MACHINERY_FORM')

export const SUBMIT_MACHINERY_FORM = createAsyncThunk(
    'MACHINERY/SUBMIT_MACHINERY_FORM',
    async (payload: Partial<TMachinery>) => {
        const response = await createMachine(payload)
        return response
    },
)

export const UPDATE_MACHINERY_FORM: AsyncThunk<
    TMachinery,
    Partial<TMachinery>,
    {}
> = createAsyncThunk('MACHINERY/UPDATE_MACHINERY_FORM', async (payload: Partial<TMachinery>) => {
    const response = await updateMachine(payload.id || 0, payload)
    return response
})
