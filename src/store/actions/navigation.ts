import { createAction } from '@reduxjs/toolkit'

export const SET_NAVIGATION_BREADCRUMB = createAction<string[]>(
    'NAVIGATION/SET_NAVIGATION_BREADCRUMB',
)
