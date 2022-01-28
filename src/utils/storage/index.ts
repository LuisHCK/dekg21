import { execSync } from 'child_process'
import { remote } from 'electron'
import fs from 'fs'
import path from 'path'
import { TStoreFileParams } from 'types/utils'

const APP_DATA_PATH = path.join(remote.app.getPath('userData'), 'userData')

const verifyPath = () => {
    if (!fs.existsSync(APP_DATA_PATH)) {
        fs.mkdirSync(APP_DATA_PATH, { recursive: true })
    }
}

function getMimeFromPath(filePath: string) {
    const mimeType = execSync('file --mime-type -b "' + filePath + '"').toString()
    return mimeType.trim()
}

export const storeFile = async ({ file, name }: TStoreFileParams): Promise<string> => {
    verifyPath()

    const filePath = path.join(APP_DATA_PATH, name)
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
