import { compareSync, genSaltSync, hashSync } from 'bcryptjs'

const salt = genSaltSync(5)

export const comparePassword = (
    passwordHash: string,
    plainPassword: string,
): boolean | undefined => {
    return compareSync(plainPassword, passwordHash)
}

export const hashPassword = (pwd: string) => hashSync(pwd, salt)
