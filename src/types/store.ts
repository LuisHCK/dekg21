import { IConfig } from './config'
import { TEmployeeState } from './employee'
import { TMachineryState } from './machinery'
import { INavigationState } from './ui'
import { IAuthState, IUsersState } from './user'

export interface IAppState {
    auth: IAuthState
    navigation: INavigationState
    config: IConfig
    users: IUsersState
    machinery: TMachineryState
    employee: TEmployeeState
}