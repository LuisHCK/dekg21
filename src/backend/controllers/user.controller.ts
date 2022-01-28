import database from 'database'
import { omit } from 'lodash'
import { IAuthUser, IUser } from 'types/user'
import { comparePassword, hashPassword } from 'utils/auth'

const UserTable = database.table<IUser>('user')

const safeUser = (user: IUser) => omit(user, ['password', 'passwordDigest'])

export const authenticateUser = async (
    email: string,
    password: string,
): Promise<IUser | undefined> => {
    const user = await database
        .table<IAuthUser>('user')
        .where('email')
        .equalsIgnoreCase(email)
        .first()

    if (user && comparePassword(user.passwordDigest, password)) {
        return omit(user, ['passwordDigest'])
    } else {
        throw Error('User not found')
    }
}

export const getUserById = async (id: number): Promise<IUser | undefined> => {
    return await UserTable.get(id)
}

export const registerUser = async (data: any): Promise<IUser | undefined> => {
    const userId = await UserTable.add({ ...data, passwordDigest: hashPassword(data.password) })
    const user = await UserTable.get(userId)
    if (user) {
        return safeUser(user) as IUser
    }
}

export const getAllUsers = async (): Promise<IUser[]> => {
    const users = await UserTable.toArray()
    return users
}
