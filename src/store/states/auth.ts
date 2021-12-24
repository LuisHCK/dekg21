import Cookies from 'js-cookie'
import { IAuthState } from 'types/user'

export const authInitialState: IAuthState = {
    loading: false,
    error: false,
    user: undefined,
    tokenExpiresAt: Cookies.get('tokenExpiration'),
}
