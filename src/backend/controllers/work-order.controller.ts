import database from 'database'
import { TEmployee } from 'types/employee'
import { TPart } from 'types/inventory'
import { TMachinery } from 'types/machinery'
import { TWorkOrder, TWorkOrderPostBody } from 'types/work-order'

const WorkOrderTable = database.table<TWorkOrder>('workOrder')
const MachineTable = database.table<TMachinery>('machinery')
const EmployeeTable = database.table<TEmployee>('employee')
const PartTable = database.table<TPart>('part')

const insertRelationShips = async (workOrder: TWorkOrder) => {
    if (!workOrder) {
        return
    }

    const machine = await MachineTable.get(Number(workOrder.machine))
    const employee = await EmployeeTable.get(Number(workOrder.employee))

    const partsUsed = await Promise.all(
        workOrder.partUsed.map(async (partUsed) => {
            const part = await PartTable.get(partUsed.part.id || 0)
            if (part) return { ...partUsed, part: part }
            return partUsed
        }),
    )

    if (machine) workOrder.machine = machine
    if (employee) workOrder.employee = employee
    if (partsUsed) workOrder.partUsed = partsUsed
}

export const listWorkOrders = async (): Promise<TWorkOrder[]> => {
    const workOrders = await WorkOrderTable.toArray()

    return await Promise.all(
        workOrders.map(async (workOrder) => {
            await insertRelationShips(workOrder)
            return workOrder
        }),
    )
}

export const showWorkOrder = async (id: number): Promise<TWorkOrder> => {
    const workOrder = await WorkOrderTable.get(id)

    if (workOrder) {
        await insertRelationShips(workOrder)
        return workOrder
    }

    throw Error('No se encontró la orden de trabajo')
}

export const createWorkOrder = async (data: Partial<TWorkOrderPostBody>): Promise<TWorkOrder> => {
    const id = await WorkOrderTable.add(data as any)
    const workOrder = await WorkOrderTable.get(id)

    if (workOrder) {
        await insertRelationShips(workOrder)
        return workOrder
    }

    throw Error('No se encontró la orden de trabajo')
}

export const updateWorkOrder = async (
    id: number,
    data: Partial<TWorkOrderPostBody>,
): Promise<TWorkOrder> => {
    await WorkOrderTable.update(id, data as any)
    const workOrder = await WorkOrderTable.get(id)

    if (workOrder) {
        await insertRelationShips(workOrder)
        return workOrder
    }

    throw Error('No se encontró la orden de trabajo')
}
