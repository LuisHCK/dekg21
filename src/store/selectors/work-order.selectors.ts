import { createSelector } from '@reduxjs/toolkit'
import { IAppState } from 'types/store'

const AppState = (state: IAppState) => state.workOrder

export const SELECT_WORK_ORDER_STATE = createSelector(AppState, (workOrder) => workOrder)
