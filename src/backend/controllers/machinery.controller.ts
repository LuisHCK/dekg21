import database from 'database'
import { isString } from 'lodash'
import { TMachinery } from 'types/machinery'

const MachineryTable = database.table<TMachinery>('machinery')

export const listMachinery = async (): Promise<TMachinery[]> => {
    return await MachineryTable.toArray()
}

export const showMachinery = async (id: number): Promise<TMachinery> => {
    const machine = await MachineryTable.get(id)

    if (machine) {
        return machine
    }

    throw Error('Machine not found')
}

export const createMachine = async (data: Partial<TMachinery>): Promise<TMachinery> => {
    const body = { ...data }

    if (body.photo && isString(body.photo)) {
        body.photo = { path: body.photo }
    }

    const newMachineId = await MachineryTable.add(body as any)
    const machine = await MachineryTable.get(newMachineId)

    if (machine) {
        return machine
    }
    throw Error('Machine not found')
}

export const updateMachine = async (id: number, data: Partial<TMachinery>): Promise<TMachinery> => {
    const body = { ...data }

    if (body.photo && isString(body.photo)) {
        body.photo = { path: body.photo }
    }

    await MachineryTable.update(id, body)
    const machine = await MachineryTable.get(id)

    if (machine) {
        return machine
    }
    throw Error('Machine not found')
}
