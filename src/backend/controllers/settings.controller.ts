import database from 'database'
import { TSettings, TSettingsBody } from 'types/settings'

const SettingsTable = database.table<TSettings>('settings')

export const listSettings = async (): Promise<TSettings[]> => {
    return await SettingsTable.toArray()
}

export const getSettingsByName = async (settingsName: string): Promise<TSettings> => {
    const settings = await SettingsTable.get({ name: settingsName })

    if (settings) return settings
    throw Error('No se encontró el registro')
}

export const createSettings = async ({ name, value }: TSettingsBody): Promise<TSettings> => {
    const settingsId = await SettingsTable.add({ id: 0, name, value })

    const settings = await SettingsTable.get(settingsId)

    if (settings) return settings
    throw Error('No se encontró el registro')
}

export const updateSettings = async ({ name, value }: TSettingsBody): Promise<TSettings> => {
    const settingsId = await SettingsTable.get({ name })
    await SettingsTable.update(settingsId || 0, value)
    const settings = await SettingsTable.get({ name })

    if (settings) return settings
    throw Error('No se encontró el registro')
}

export const createOrUpdateSettings = async ({
    name,
    value,
}: TSettingsBody): Promise<TSettings> => {
    const settingsId = await SettingsTable.put({ id: 0, name, value })
    const settings = await SettingsTable.get(settingsId)

    if (settings) return settings
    throw Error('No se encontró el registro')
}
