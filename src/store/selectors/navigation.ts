import { createSelector } from '@reduxjs/toolkit'
import { IAppState } from 'types/store'

const AppState = (state: IAppState) => state.navigation

export const GET_NAVIGATION_STATE = createSelector(
    AppState,
    (navigation) => navigation,
)
