import { createSelector } from '@reduxjs/toolkit'
import { IAppState } from 'types/store'

const AppState = (state: IAppState) => state.employee

export const SELECT_EMPLOYEE_STATE = createSelector(AppState, (employee) => employee)

export const SELECT_CURRENT_EMPLOYEE = createSelector(
    AppState,
    (employee) => employee.currentEmployee,
)
