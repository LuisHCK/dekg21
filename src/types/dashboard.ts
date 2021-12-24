import React from 'react'

export interface IStatItem {
    key?: string
    title: string
    value: string | number
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    className?: string
}

export interface IModuleLink {
    to: string
    label: string
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    className?: string
}
