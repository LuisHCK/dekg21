export type TSettingsValue = {
    [key: string]: string | number | undefined | null
}

export type TSettings = {
    id: number
    name: string
    value: TSettingsValue
    state?: string
}

export type TSettingsBody = {
    name: string
    value: TSettingsValue
}
