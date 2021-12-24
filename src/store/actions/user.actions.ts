import { createAsyncThunk } from '@reduxjs/toolkit'
import API_ROUTES from 'app-constants/api-routes'
import HTTPClient from 'utils/http-client'
import { IPostUser, IUser } from 'types/user'

export const GET_ALL_USERS = createAsyncThunk('USERS/GET_ALL_USERS', async () => {
    const respone = await HTTPClient.get<IUser[]>(API_ROUTES.USER.ROOT)
    return respone.data
})

export const CREATE_USER = createAsyncThunk(
    'USERS/CREATE_USER',
    async ({ user }: { user: IPostUser }) => {
        const respone = await HTTPClient.post<IUser>(API_ROUTES.USER.ROOT, user)
        return respone.data
    }
)

export const UPDATE_USER = createAsyncThunk(
    'USERS/UPDATE_USER',
    async ({ user }: { user: IPostUser }) => {
        const respone = await HTTPClient.patch<IUser>(API_ROUTES.USER.ROOT, user)
        return respone.data
    }
)
