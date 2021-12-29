import { createReducer } from '@reduxjs/toolkit'
import {
    CLEAN_CURRENT_MAINTENANCE_REGISTER,
    GET_CURRENT_MAINTENANCE_REGISTER,
    GET_MAINTENANCE_REGISTERS,
} from 'store/actions/maintenance-register.actions'
import { InitialMaintenanceRegisterState } from 'store/states/maintenance-register.state'

const maintenanceRegisterReducer = createReducer(InitialMaintenanceRegisterState, (builder) => {
    // LIST
    builder.addCase(GET_MAINTENANCE_REGISTERS.pending, (state) => ({
        ...state,
        loading: true,
        error: false,
    }))

    builder.addCase(GET_MAINTENANCE_REGISTERS.rejected, (state) => ({
        ...state,
        loading: false,
        error: true,
    }))

    builder.addCase(GET_MAINTENANCE_REGISTERS.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        error: false,
        registers: payload,
    }))

    // CURRENT
    builder.addCase(GET_CURRENT_MAINTENANCE_REGISTER.pending, (state) => ({
        ...state,
        loading: true,
        error: false,
    }))

    builder.addCase(GET_CURRENT_MAINTENANCE_REGISTER.rejected, (state) => ({
        ...state,
        loading: false,
        error: true,
    }))

    builder.addCase(GET_CURRENT_MAINTENANCE_REGISTER.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        error: false,
        currentMaintenance: payload,
    }))

    builder.addCase(CLEAN_CURRENT_MAINTENANCE_REGISTER, (state) => ({
        ...state,
        currentMaintenance: undefined,
    }))
})

export default maintenanceRegisterReducer
