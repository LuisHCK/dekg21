import Dexie from 'dexie'

const database = new Dexie('dekg21')

database.version(0.1).stores({
    user: `
        ++id,
        firstName,
        lastName,
        passwordDigest,
        email`,
    machinery: `
        ++id,
        name,
        description,
        brand,
        model,
        photoUrl`,
})

export default database
