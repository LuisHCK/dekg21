export type TFormData = {
    identifier: string
    password: string
    rememberMe: boolean
}

export interface IUserAuth {
    identifier: string
    password: string
}

export interface IRole {
    description: string
    id: number
    name: string
    type: string
}

export interface IUser {
    id: number
    blocked: boolean
    confirmed: boolean
    created_at: string
    email: string
    firstName: string
    lastName: string
    provider: string
    role?: IRole
    description: string
}

export interface IAuthUser extends IUser {
    passwordDigest: string
}

export interface IPostUser extends IUser {
    password: string
}

export interface IAuthResponse {
    jwt: string
    user: IUser
}

export interface IAuthState {
    loading: boolean
    error: boolean
    user: IUser | undefined
    tokenExpiresAt: string | undefined
}

export interface IUsersState {
    loading: boolean
    error: boolean
    users: IUser[] | undefined
}
