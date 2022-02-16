import { remote } from 'electron'
import fs from 'fs'
import path from 'path'
import { lookup } from 'mime-types'
import { TStoreFileParams } from 'types/utils'

export const APP_DATA_PATH = path.join(remote.app.getPath('userData'), 'userData')
export const DOCUMENTS_PATH = path.join(remote.app.getPath('documents'), 'DEK-G21')

const verifyPath = (targetPath: string) => {
    if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true })
    }
}

function getMimeFromPath(filePath: string) {
    const extension = filePath.split('.').pop() || ''
    const mime = lookup(extension)

    return mime || ''
}

export const storeFile = async ({ file, name, customPath }: TStoreFileParams): Promise<string> => {
    verifyPath(customPath || APP_DATA_PATH)

    const filePath = path.join(customPath || APP_DATA_PATH, name)
    const fileArrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(fileArrayBuffer)
    fs.writeFileSync(filePath, buffer)

    return filePath
}

export const readFileAsB64 = (path?: string): string => {
    if (!path) {
        return ''
    }
    const mime = getMimeFromPath(path)
    const file = fs.readFileSync(path, { encoding: 'base64' })

    return `data:${mime};base64,${file}`
}
