import { IUser } from './user'

export interface IAsset {
    name: string
    path: string
    size: number
    type: string
    user: Partial<IUser>
}

export type TAsset = {
    id: number
    name: string
    alternativeText: string
    caption: string
    width: number
    height: number
    formats: {
        thumbnail: {
            name: string
            hash: string
            ext: string
            mime: string
            width: number
            height: number
            size: number
            path: string
            url: string
        }
    }
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: string
    provider: string
    provider_metadata: any
    created_at: string
    updated_at: string
}
