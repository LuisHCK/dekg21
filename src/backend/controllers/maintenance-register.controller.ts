import database from 'database'
import { isObject } from 'lodash'
import moment from 'moment'
import { TMachinery } from 'types/machinery'
import { TMaintenanceRegister } from 'types/maintenance-register'

const MaintenanceTable = database.table<TMaintenanceRegister>('maintenanceRegister')
const MachineTable = database.table<TMachinery>('machinery')

const generateExpectedDates = (date?: string, frequency?: number): string[] => {
    if (!date || !frequency) {
        return []
    }

    const dates: string[] = []

    let startDate = moment(date)
    let currentDate = moment(date)

    while (currentDate.diff(startDate, 'years', true) < 1) {
        currentDate.add(frequency, 'days')
        dates.push(currentDate.toISOString().split('T')[0])
    }

    return dates
}

const insertMachine = async (register: TMaintenanceRegister) => {
    const machine = await MachineTable.get(Number(register.machine))
    if (machine) register.machine = machine
}

export const listMaintenanceRegisters = async (): Promise<TMaintenanceRegister[]> => {
    const registers = await MaintenanceTable.toArray()

    return await Promise.all(
        registers.map(async (register) => {
            const machine = await MachineTable.get(
                !isObject(register.machine) ? register.machine : 0,
            )
            if (machine) return { ...register, machine }
            return register
        }),
    )
}

export const showMaintenanceRegister = async (id: number): Promise<TMaintenanceRegister> => {
    const register = await MaintenanceTable.get(id)

    if (register) await insertMachine(register)

    if (register) return register
    throw Error('No se encontró el registro')
}

export const createMaintenanceRegister = async (
    data: Partial<TMaintenanceRegister>,
): Promise<TMaintenanceRegister> => {
    const body = { ...data, expectedDates: generateExpectedDates(data?.date, data?.frequency) }

    const newRegister = await MaintenanceTable.add(body as any)
    const register = await MaintenanceTable.get(newRegister)

    if (register) await insertMachine(register)

    if (register) return register
    throw Error('No se encontró el registro')
}

export const updateMaintenanceRegister = async (
    id: number,
    data: Partial<TMaintenanceRegister>,
): Promise<TMaintenanceRegister> => {
    const body = { ...data, expectedDates: generateExpectedDates(data?.date, data?.frequency) }

    await MaintenanceTable.update(id, body as any)
    const register = await MaintenanceTable.get(id)

    if (register) await insertMachine(register)

    if (register) return register
    throw Error('No se encontró el registro')
}
