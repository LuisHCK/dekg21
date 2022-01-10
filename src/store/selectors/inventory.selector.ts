import { createSelector } from '@reduxjs/toolkit'
import { IAppState } from 'types/store'

const AppState = (state: IAppState) => state.inventory

export const SELECT_INVENTORY_STATE = createSelector(AppState, (inventory) => inventory)
