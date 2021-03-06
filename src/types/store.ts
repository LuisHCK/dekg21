import { IConfig } from './config'
import { TEmployeeState } from './employee'
import { TInventoryState } from './inventory'
import { TMachineryState } from './machinery'
import { TMaintenanceRegisterState } from './maintenance-register'
import { INavigationState } from './ui'
import { IAuthState, IUsersState } from './user'
import { TWorkOrderState } from './work-order'

export interface IAppState {
    auth: IAuthState
    navigation: INavigationState
    config: IConfig
    users: IUsersState
    machinery: TMachineryState
    employee: TEmployeeState
    maintenanceRegister: TMaintenanceRegisterState
    workOrder: TWorkOrderState
    inventory: TInventoryState
}
