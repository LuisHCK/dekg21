import { createSelector } from '@reduxjs/toolkit'
import { IAppState } from 'types/store'

const AppState = (state: IAppState) => state.machinery

export const SELECT_MACHINERY_STATE = createSelector(AppState, (machinery) => machinery)

export const SELECT_CURRENT_MACHINE = createSelector(
    AppState,
    (machinery) => machinery.currentMachine,
)
