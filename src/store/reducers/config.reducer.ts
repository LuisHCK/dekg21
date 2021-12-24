import { createReducer } from '@reduxjs/toolkit'
import { GET_GLOBAL_CONFIG } from 'store/actions/config.actions'
import { configInitialState } from 'store/states/config.state'

export const configReducer = createReducer(configInitialState, (builder) => {
    builder.addCase(GET_GLOBAL_CONFIG.fulfilled, (state, { payload }) => ({
        ...state,
        ...payload,
    }))
})
