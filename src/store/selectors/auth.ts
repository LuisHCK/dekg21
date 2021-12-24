import { createSelector } from '@reduxjs/toolkit'
import { IAppState } from 'types/store'

const AppState = (state: IAppState) => state.auth

export const GET_AUTH_STATE = createSelector(AppState, (auth) => auth)
