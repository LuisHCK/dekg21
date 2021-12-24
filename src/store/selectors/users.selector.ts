import { createSelector } from '@reduxjs/toolkit'
import { IAppState } from 'types/store'

const AppState = (state: IAppState) => state.users

export const GET_USERS_STATE = createSelector(AppState, (users) => users)
