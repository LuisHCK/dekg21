import { createAsyncThunk } from '@reduxjs/toolkit'
import API_ROUTES from 'app-constants/api-routes'
import HTTPClient from 'utils/http-client'
import { IConfig } from 'types/config'

export const GET_GLOBAL_CONFIG = createAsyncThunk('CONFIG/GET_GLOBAL_CONFIG', async () => {
    const response = await HTTPClient.get<IConfig>(API_ROUTES.CONFIG)

    return response.data
})
