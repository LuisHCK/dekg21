import { createReducer } from '@reduxjs/toolkit'
import {
    CLEAN_CURRENT_EMPLOYEE,
    CREATE_EMPLOYEE,
    GET_ALL_EMPLOYEES,
    GET_CURRENT_EMPLOYEE,
    UPDATE_EMPLOYEE,
} from 'store/actions/employee.actions'
import { employeeInitialState } from 'store/states/employee.state'

export const employeeReducer = createReducer(employeeInitialState, (builder) => {
    /* LIST EMPLOYEES */
    builder.addCase(GET_ALL_EMPLOYEES.pending, (state) => ({
        ...state,
        loading: true,
        error: false,
    }))

    builder.addCase(GET_ALL_EMPLOYEES.rejected, (state) => ({
        ...state,
        loading: false,
        error: true,
    }))

    builder.addCase(GET_ALL_EMPLOYEES.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        error: false,
        employees: payload,
    }))

    /* CREATE EMPLOYEE */
    builder.addCase(CREATE_EMPLOYEE.pending, (state) => ({
        ...state,
        loading: true,
        error: false,
    }))

    builder.addCase(CREATE_EMPLOYEE.rejected, (state) => ({
        ...state,
        loading: false,
        error: true,
    }))

    builder.addCase(CREATE_EMPLOYEE.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        error: false,
        employees: [payload, ...state.employees],
    }))

    /* UPDATE EMPLOYEE */
    builder.addCase(UPDATE_EMPLOYEE.pending, (state) => ({
        ...state,
        loading: true,
        error: false,
    }))

    builder.addCase(UPDATE_EMPLOYEE.rejected, (state) => ({
        ...state,
        loading: false,
        error: true,
    }))

    builder.addCase(UPDATE_EMPLOYEE.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        error: false,
        employees: state.employees.map((employee) => {
            if (employee.id === payload.id) {
                return payload
            }
            return employee
        }),
    }))

    builder.addCase(GET_CURRENT_EMPLOYEE.pending, (state) => ({
        ...state,
        loading: true,
        error: false,
    }))

    builder.addCase(GET_CURRENT_EMPLOYEE.rejected, (state) => ({
        ...state,
        loading: false,
        error: true,
    }))

    builder.addCase(GET_CURRENT_EMPLOYEE.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        error: false,
        currentEmployee: payload,
    }))

    builder.addCase(CLEAN_CURRENT_EMPLOYEE, (state) => ({
        ...state,
        currentEmployee: undefined,
    }))
})
