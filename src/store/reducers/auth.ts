import { createReducer } from '@reduxjs/toolkit'
import { AUTH_CLEAN_REQUEST_STATUS, AUTH_LOGIN, AUTH_REGISTER } from 'store/actions/auth'
import { authInitialState } from 'store/states/auth'

export const authReducer = createReducer(authInitialState, (builder) => {
    builder.addCase(AUTH_LOGIN.pending, (state) => ({
        ...state,
        loading: true,
    }))

    builder.addCase(AUTH_LOGIN.rejected, (state) => ({
        ...state,
        loading: false,
        error: true,
    }))

    builder.addCase(AUTH_LOGIN.fulfilled, (state, { payload }) => {
        localStorage.setItem('currentUser', JSON.stringify(payload))
        return {
            ...state,
            user: payload,
            loading: false,
        }
    })

    // User registration
    builder.addCase(AUTH_REGISTER.pending, (state) => ({
        ...state,
        loading: true,
        error: false,
    }))

    builder.addCase(AUTH_REGISTER.rejected, (state) => ({
        ...state,
        loading: false,
        error: true,
    }))

    builder.addCase(AUTH_REGISTER.fulfilled, (state, { payload }) => {
        localStorage.setItem('currentUser', JSON.stringify(payload))
        return {
            ...state,
            loading: false,
            error: false,
            user: payload,
        }
    })

    builder.addCase(AUTH_CLEAN_REQUEST_STATUS, (state) => {
        localStorage.removeItem('currentUser')
        return {
            ...state,
            loading: false,
            error: false,
            user: undefined,
        }
    })
})
