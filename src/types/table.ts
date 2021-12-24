import React from 'react'

export type TTableColumn<RecordType> = {
    key: React.Key | keyof RecordType
    field: string
    label: string
    className?: string
    width?: number | string
    render?: (record: RecordType, index: number) => React.ReactNode
}

export type TTableColumns<RecordType = unknown> = TTableColumn<RecordType>[]

export type TTableConfig = {
    striped?: boolean
    compact?: boolean
    hover?: boolean
    headerClassName?: string
    bodyClassName?: string
    className?: string
}

export type TTableProps<RecordType = unknown> = TTableConfig & {
    data: RecordType[]
    columns: TTableColumns<RecordType>
    rowKey: keyof RecordType
    config?: TTableConfig
}

export type TRowProps<RecordType = unknown> = TTableConfig & {
    rowKey: keyof RecordType
    data: RecordType[]
    columns: TTableColumns<RecordType>
}
