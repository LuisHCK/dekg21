import { createReducer } from '@reduxjs/toolkit'
import { GET_GLOBAL_CONFIG, SET_GLOBAL_SETTINGS } from 'store/actions/config.actions'
import { configInitialState } from 'store/states/config.state'

export const configReducer = createReducer(configInitialState, (builder) => {
    builder.addCase(GET_GLOBAL_CONFIG.fulfilled, (state, { payload }) => ({
        ...state,
        ...payload,
    }))

    builder.addCase(SET_GLOBAL_SETTINGS, (state, {payload}) => ({
        ...state,
        ...payload
    }))
})
