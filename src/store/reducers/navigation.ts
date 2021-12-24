import { createReducer } from '@reduxjs/toolkit'
import { SET_NAVIGATION_BREADCRUMB } from 'store/actions/navigation'
import { navigationInitialState } from 'store/states/navigation'

export const navigationReducer = createReducer(
    navigationInitialState,
    (builder) => {
        builder.addCase(SET_NAVIGATION_BREADCRUMB, (state, { payload }) => ({
            ...state,
            breadcrumb: payload,
        }))
    },
)
