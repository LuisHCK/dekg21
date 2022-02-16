import { createReducer } from '@reduxjs/toolkit'
import {
    CLEAN_CURRENT_MACHINE,
    GET_ALL_MACHINES,
    SET_CURRENT_MACHINE,
    SET_MACHINERY_FORM,
    SUBMIT_MACHINERY_FORM,
    UPDATE_MACHINERY_FORM,
} from 'store/actions/machine.actions'
import { machineryInitialState } from 'store/states/machinery.state'

export const machineryReducer = createReducer(machineryInitialState, (builder) => {
    builder.addCase(GET_ALL_MACHINES.pending, (state) => ({
        ...state,
        loading: true,
    }))

    builder.addCase(GET_ALL_MACHINES.rejected, (state) => ({
        ...state,
        loading: false,
    }))

    builder.addCase(GET_ALL_MACHINES.fulfilled, (state, { payload }) => ({
        ...state,
        machines: payload,
        loading: false,
    }))

    builder.addCase(SET_MACHINERY_FORM, (state, { payload }) => ({
        ...state,
        machineryForm: payload,
    }))

    // Current machine
    builder.addCase(SET_CURRENT_MACHINE.fulfilled, (state, { payload }) => ({
        ...state,
        currentMachine: payload,
    }))

    // POST MACHINERY
    builder.addCase(SUBMIT_MACHINERY_FORM.pending, (state) => ({
        ...state,
        loading: true,
        error: false,
    }))

    builder.addCase(SUBMIT_MACHINERY_FORM.rejected, (state) => ({
        ...state,
        loading: false,
        error: true,
    }))

    builder.addCase(SUBMIT_MACHINERY_FORM.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        error: false,
        machines: [...state.machines, payload],
    }))

    // Update machinery
    builder.addCase(UPDATE_MACHINERY_FORM.pending, (state) => ({
        ...state,
        loading: true,
    }))

    builder.addCase(UPDATE_MACHINERY_FORM.rejected, (state) => ({
        ...state,
        loading: false,
        error: true,
    }))

    builder.addCase(UPDATE_MACHINERY_FORM.fulfilled, (state, { payload }) => ({
        ...state,
        currentMachine: payload,
        loading: false,
        error: true,
    }))

    // Clean current machine
    builder.addCase(CLEAN_CURRENT_MACHINE, (state) => ({
        ...state,
        currentMachine: null,
    }))
})
