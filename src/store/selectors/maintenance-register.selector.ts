import { createSelector } from '@reduxjs/toolkit'
import { IAppState } from 'types/store'

const AppState = (state: IAppState) => state.maintenanceRegister

export const SELECT_MAINTENANCE_STATE = createSelector(AppState, (state) => state)
export const SELECT_CURRENT_MAINTENANCE_REGISTER = createSelector(
    AppState,
    (state) => state.currentMaintenance,
)
