import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import API_ROUTES from 'app-constants/api-routes'
import HTTPClient from 'utils/http-client'
import { IAuthResponse, IUser, IUserAuth } from 'types/user'
import { AxiosResponse } from 'axios'

export const AUTH_LOGIN = createAsyncThunk('AUTH/LOGIN', async (payload: IUserAuth) => {
    const response = await HTTPClient.post<IUserAuth, AxiosResponse<IAuthResponse>>(
        API_ROUTES.AUTH_LOGIN,
        payload,
    )
    return response.data
})

export const AUTH_CLEAN_REQUEST_STATUS = createAction('AUTH/CLEAN_REQUEST_STATUS')

export const GET_USER_PROFILE = createAsyncThunk('AUTH/GET_PROFILE', async () => {
    const response = await HTTPClient.get<IUser>(API_ROUTES.USER.PROFILE)

    return response.data
})
