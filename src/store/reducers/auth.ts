import { createReducer } from '@reduxjs/toolkit'
import moment from 'moment'
import Cookies from 'js-cookie'
import { AUTH_CLEAN_REQUEST_STATUS, AUTH_LOGIN, GET_USER_PROFILE } from 'store/actions/auth'
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
        Cookies.set('authToken', payload.jwt)
        const tokenExpiration = moment(new Date()).add(7, 'days')
        Cookies.set('tokenExpiration', tokenExpiration.toISOString())

        return {
            ...state,
            user: payload.user,
            loading: false,
            tokenExpiresAt: tokenExpiration.toISOString(),
        }
    })

    builder.addCase(AUTH_CLEAN_REQUEST_STATUS, (state) => ({
        ...state,
        loading: false,
        error: false,
    }))

    // Load user profile
    builder.addCase(GET_USER_PROFILE.pending, (state) => ({
        ...state,
        loading: true,
        error: false,
    }))

    builder.addCase(GET_USER_PROFILE.rejected, (state) => ({
        ...state,
        loading: false,
        error: true,
    }))

    builder.addCase(GET_USER_PROFILE.fulfilled, (state, { payload }) => {
        Cookies.set('user', JSON.stringify(payload))
        return { ...state, loading: false, error: false, user: payload }
    })
})
