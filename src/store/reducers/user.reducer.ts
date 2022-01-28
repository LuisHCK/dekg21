import { createReducer } from '@reduxjs/toolkit'
import { usersInitialState } from 'store/states/users.states'
import { GET_ALL_USERS } from 'store/actions/user.actions'

export const userReducer = createReducer(usersInitialState, (builder) => {
    builder.addCase(GET_ALL_USERS.pending, (state) => ({
        ...state,
        loading: true,
        error: false,
    }))

    builder.addCase(GET_ALL_USERS.rejected, (state) => ({
        ...state,
        loading: false,
        error: true,
    }))

    builder.addCase(GET_ALL_USERS.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        error: false,
        users: payload,
    }))
})
