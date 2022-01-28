import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import API_ROUTES from 'app-constants/api-routes'
import HTTPClient from 'utils/http-client'
import {  IUser, IUserAuth } from 'types/user'
import { authenticateUser, registerUser } from 'backend/controllers/user.controller'

export const AUTH_LOGIN = createAsyncThunk('AUTH/LOGIN', async (payload: IUserAuth) => {
    const response = await authenticateUser(payload.identifier, payload.password)
    return response
})

export const AUTH_REGISTER = createAsyncThunk('AUTH/REGISTER', async (payload: IUserAuth) => {
    const response = await registerUser({ email: payload.identifier, password: payload.password })
    return response
})

export const AUTH_CLEAN_REQUEST_STATUS = createAction('AUTH/CLEAN_REQUEST_STATUS')

export const GET_USER_PROFILE = createAsyncThunk('AUTH/GET_PROFILE', async () => {
    const response = await HTTPClient.get<IUser>(API_ROUTES.USER.PROFILE)

    return response.data
})
