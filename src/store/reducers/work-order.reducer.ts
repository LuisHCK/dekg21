import { createReducer } from '@reduxjs/toolkit'
import {
    CLEAN_CURRENT_WORK_ORDER,
    CREATE_WORK_ORDER,
    GET_CURRENT_WORK_ORDER,
    GET_WORK_ORDERS,
    UPDATE_WORK_ORDER,
} from 'store/actions/work-order.reducer'
import { workOrderState } from 'store/states/work-order.state'

const workOrderReducer = createReducer(workOrderState, (builder) => {
    builder.addCase(GET_WORK_ORDERS.pending, (state) => ({ ...state, loading: true, error: false }))

    builder.addCase(GET_WORK_ORDERS.rejected, (state) => ({
        ...state,
        loading: false,
        error: true,
    }))

    builder.addCase(GET_WORK_ORDERS.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        error: false,
        workOrders: payload,
    }))

    // CURRENT WORK ORDER
    builder.addCase(GET_CURRENT_WORK_ORDER.fulfilled, (state, { payload }) => ({
        ...state,
        currentOrder: payload,
    }))

    // UPDATE ORDER

    builder.addCase(UPDATE_WORK_ORDER.pending, (state) => ({
        ...state,
        loading: true,
        error: false,
    }))

    builder.addCase(UPDATE_WORK_ORDER.rejected, (state) => ({
        ...state,
        loading: false,
        error: true,
    }))

    builder.addCase(UPDATE_WORK_ORDER.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        error: false,
        currentOrder: payload,
    }))

    // CREATE WORK ORDER
    builder.addCase(CREATE_WORK_ORDER.pending, (state) => ({
        ...state,
        loading: true,
        error: false,
    }))

    builder.addCase(CREATE_WORK_ORDER.rejected, (state) => ({
        ...state,
        loading: false,
        error: true,
    }))

    builder.addCase(CREATE_WORK_ORDER.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        error: false,
        currentOrder: payload,
    }))

    // CLEAN CURRENT WORK ORDER
    builder.addCase(CLEAN_CURRENT_WORK_ORDER, (state) => ({
        ...state,
        currentOrder: undefined,
    }))
})

export default workOrderReducer
