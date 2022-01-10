import React from 'react'

export type AppRoute = {
    path: string | string[]
    component: React.FC
    exact?: boolean
    isPublic?: boolean
}
