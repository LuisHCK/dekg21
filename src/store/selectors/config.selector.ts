import { createSelector } from '@reduxjs/toolkit'
import { IAppState } from 'types/store'

const AppState = (state: IAppState) => state.config

export const GET_GLOBAL_CONFIG_STATE = createSelector(
    AppState,
    (config) => config,
)
