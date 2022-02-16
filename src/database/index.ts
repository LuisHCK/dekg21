import Dexie from 'dexie'
import { importInto, exportDB } from 'dexie-export-import'
import { DOCUMENTS_PATH, storeFile } from 'utils/storage'

const database = new Dexie('dekg21')

database.version(0.4).stores({
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
    settings: `
        ++id,
        name,
        value,
        state`,
})

export const exportDatabase = async () => {
    const blob = await exportDB(database)
    const fileName = `copia-de-seguridad-${new Date().toISOString()}.dek`

    await storeFile({
        file: new File([blob], fileName),
        name: fileName,
        customPath: DOCUMENTS_PATH,
    })
}

export const importDatabase = async (data: Blob | File) => {
    importInto(database, data, { clearTablesBeforeImport: true }).catch((error) => {
        alert('ERROR\nEl archivo seleccionado no es una copia de seguridad válida')
    })
}

export default database
