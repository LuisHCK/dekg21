import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { createPart, listParts, showPart, updatePart } from 'backend/controllers/part.controller'
import { TPart } from 'types/inventory'

type TParams = {
    id?: number
    data: Partial<TPart>
}

export const GET_ALL_PARTS = createAsyncThunk('INVENTORY/GET_ALL_PRODUCTS', async () => {
    const response = await listParts()
    return response
})

export const GET_CURRENT_PART = createAsyncThunk(
    'INVENTORY/GET_CURRENT_PART',
    async ({ id }: Partial<TParams>) => {
        const response = await showPart(id || 0)
        return response
    },
)

export const CREATE_PART = createAsyncThunk(
    'INVENTORY/CREATE_PART',
    async ({ data }: Partial<TParams>) => {
        const response = await createPart(data || {})
        return response
    },
)

export const UPDATE_PART = createAsyncThunk(
    'INVENTORY/UPDATE_PART',
    async ({ id, data }: Partial<TParams>) => {
        const response = await updatePart(id || 0, data || {})
        return response
    },
)

export const TOGGLE_PART_FORM = createAction('INVENTORY/TOGGLE_PART_FORM')

export const CLEAN_CURRENT_PART = createAction('INVENTORY/CLEAN_CURRENT_PART')
