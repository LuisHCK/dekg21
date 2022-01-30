import database from 'database'
import { TPart } from 'types/inventory'

const PartTable = database.table('part')

export const listParts = async (): Promise<TPart[]> => {
    return await PartTable.toArray()
}

export const showPart = async (id: number): Promise<TPart> => {
    const part = PartTable.get(id)
    if (part) return part
    throw Error('No se encontró el repuesto')
}

export const createPart = async (data: Partial<TPart>): Promise<TPart> => {
    const partId = await PartTable.add(data as any)
    const part = await PartTable.get(partId)
    if (part) return part

    throw Error('No se encontró el repuesto')
}

export const updatePart = async (id: number, data: Partial<TPart>): Promise<TPart> => {
    await PartTable.update(id, data as any)
    const part = await PartTable.get(id)
    if (part) return part

    throw Error('No se encontró el repuesto')
}
