import Dexie from 'dexie'

const database = new Dexie('dekg21')

database.version(0.1).stores({
    machinery: `
        ++id,
        name,
        description,
        brand,
        model,
        photoUrl`,
    
})

export default database
