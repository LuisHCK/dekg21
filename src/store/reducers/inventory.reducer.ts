import { createReducer } from '@reduxjs/toolkit'
import {
    CLEAN_CURRENT_PART,
    CREATE_PART,
    GET_ALL_PARTS,
    GET_CURRENT_PART,
    TOGGLE_PART_FORM,
    UPDATE_PART,
} from 'store/actions/inventory.actions'
import { inventoryState } from 'store/states/inventory.state'

const inventoryReducer = createReducer(inventoryState, (builder) => {
    builder.addCase(GET_ALL_PARTS.pending, (state) => ({
        ...state,
        loading: true,
        error: false,
    }))

    builder.addCase(GET_ALL_PARTS.rejected, (state) => ({
        ...state,
        loading: false,
        error: true,
    }))

    builder.addCase(GET_ALL_PARTS.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        error: false,
        parts: payload,
    }))

    // CURRENT PART
    builder.addCase(GET_CURRENT_PART.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        error: false,
        currentPart: payload,
    }))

    // CREATE PART
    builder.addCase(CREATE_PART.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        error: false,
        currentPart: payload,
        parts: state.parts ? [...state.parts, payload] : [payload],
    }))

    // Update part
    builder.addCase(UPDATE_PART.fulfilled, (state, { payload }) => ({
        ...state,
        loading: false,
        error: false,
        currentPart: payload,
        parts: state.parts?.map((part) => {
            if (part.id === payload.id) return payload
            return part
        }),
    }))

    builder.addCase(TOGGLE_PART_FORM, (state) => ({
        ...state,
        showForm: !state.showForm,
    }))

    builder.addCase(CLEAN_CURRENT_PART, (state) => ({
        ...state,
        currentPart: undefined,
    }))
})

export default inventoryReducer
