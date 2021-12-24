import { TEmployeeState } from 'types/employee'

export const employeeInitialState: TEmployeeState = {
    loading: false,
    error: false,
    employees: [],
    currentEmployee: undefined,
}
