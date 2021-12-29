export type TTableColumn<RecordType> = {
    title: string
    field: keyof RecordType
    render?: (value: RecordType) => JSX.Element | string | number
}
