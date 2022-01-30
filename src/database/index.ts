import Dexie from 'dexie'

const database = new Dexie('dekg21')

database.version(0.3).stores({
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
    employee: `
        ++id,
        firstName,
        lastName,
        identificationCardId,
        phone,
        role,
        photo`,
    workOrder: `
        ++id,
        date,
        area,
        machine,
        type,
        description,
        partUsed,
        cost,
        employee,
        datePrev,
        observations`,
    part: `
        ++id,
        name,
        brand,
        content,
        unit,
        price,
        stock`,
    maintenanceRegister: `
        ++id,
        date,
        area,
        code,
        frequency,
        machine,
        activities,
        expectedDates`,
})

export default database
