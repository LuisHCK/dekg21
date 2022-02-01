import { createAsyncThunk } from '@reduxjs/toolkit'
import database from 'database'

export const GET_GLOBAL_CONFIG = createAsyncThunk('CONFIG/GET_GLOBAL_CONFIG', async () => {
    const response = await database.table('user').get(1)

    return response
})
