import { createSelector } from '@reduxjs/toolkit'
import { IAppState } from 'types/store'

const AppState = (state: IAppState) => state.users

export const GET_USERS_STATE = createSelector(AppState, (users) => users)

export const SELECT_ALL_USERS = createSelector(AppState, (users) => users?.users)
