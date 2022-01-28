import { IAuthState, IUser } from 'types/user'

const currentUser = localStorage.getItem('currentUser')

export const authInitialState: IAuthState = {
    loading: false,
    error: false,
    tokenExpiresAt: undefined,
    user: currentUser? JSON.parse(currentUser) as IUser : undefined
}
