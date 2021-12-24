import { IUser } from './user'

export interface IAsset {
    _id: string
    name: string
    path: string
    size: number
    type: string
    user: Partial<IUser>
}
