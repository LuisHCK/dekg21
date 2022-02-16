import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import database from 'database'
import { TSettingsValue } from 'types/settings'

export const GET_GLOBAL_CONFIG = createAsyncThunk('CONFIG/GET_GLOBAL_CONFIG', async () => {
    const response = await database.table('user').get(1)

    return response
})

export const SET_GLOBAL_SETTINGS = createAction<TSettingsValue>('CONFIG/SET_GLOBAL_SETTINGS')
