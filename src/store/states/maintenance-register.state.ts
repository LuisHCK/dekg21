import { TMaintenanceRegisterState } from 'types/maintenance-register'

export const InitialMaintenanceRegisterState: TMaintenanceRegisterState = {
    loading: false,
    error: false,
    registers: [],
    currentMaintenance: undefined,
}
