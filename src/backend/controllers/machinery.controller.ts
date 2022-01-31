import database from 'database'
import { isString } from 'lodash'
import { TMachinery, TWorkOrdersPerMachine } from 'types/machinery'
import { TWorkOrder } from 'types/work-order'

const MachineryTable = database.table<TMachinery>('machinery')
const WorkOrderTable = database.table<TWorkOrder>('workOrder')

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

export const workOrdersPerMachine = async (): Promise<TWorkOrdersPerMachine[]> => {
    const machines = await MachineryTable.toArray()

    return await Promise.all(
        machines.map(async (machine) => {
            const workOrders = await WorkOrderTable.where('machine').equals(machine.id).count()
            return {
                machine,
                workOrders,
            }
        }),
    )
}
