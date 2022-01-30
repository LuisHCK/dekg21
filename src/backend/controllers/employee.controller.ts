import database from 'database'
import { isString } from 'lodash'
import { TEmployee } from 'types/employee'

const EmployeeTable = database.table<TEmployee>('employee')

export const listEmployees = async (): Promise<TEmployee[]> => {
    return await EmployeeTable.toArray()
}

export const showEmployee = async (id: number): Promise<TEmployee> => {
    const employee = await EmployeeTable.get(id)

    if (employee) {
        return employee
    }

    throw Error('No se encontró el colaborador')
}

export const createEmployee = async (data?: Partial<TEmployee>): Promise<TEmployee> => {
    const body = { ...data }

    if (body.photo && isString(body.photo)) {
        body.photo = { path: body.photo }
    }

    const id = await EmployeeTable.add(body as any)
    const employee = await EmployeeTable.get(id)

    if (employee) return employee

    throw Error('No se pudo guardar el empleado')
}

export const updateEmploye = async (id?: number, data?: Partial<TEmployee>): Promise<TEmployee> => {
    const body = { ...data }

    if (body.photo && isString(body.photo)) {
        body.photo = { path: body.photo }
    }

    await EmployeeTable.update(id || 0, body)

    const employee = await EmployeeTable.get(id || 0)

    console.log('Employee controller: ', employee, id)

    if (employee) return employee

    throw Error('No se pudo guardar el empleado')
}
