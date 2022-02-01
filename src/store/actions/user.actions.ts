import { createAsyncThunk } from '@reduxjs/toolkit'
import { IPostUser } from 'types/user'
import { getAllUsers } from 'backend/controllers/user.controller'
import database from 'database'

export const GET_ALL_USERS = createAsyncThunk('USERS/GET_ALL_USERS', async () => {
    const respone = await getAllUsers()
    return respone
})

export const CREATE_USER = createAsyncThunk(
    'USERS/CREATE_USER',
    async ({ user }: { user: IPostUser }) => {
        const respone = await database.table('user').add(user)
        return respone
    },
)

export const UPDATE_USER = createAsyncThunk(
    'USERS/UPDATE_USER',
    async ({ user }: { user: IPostUser }) => {
        const response = await database.table('user').add(user)
        return response
    },
)
