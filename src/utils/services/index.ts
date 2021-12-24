import API_ROUTES from 'app-constants/api-routes'
import Cookies from 'js-cookie'
import HTTPClient from 'utils/http-client'
import moment from 'moment'
import { TAsset } from 'types/asset'
import { AxiosResponse } from 'axios'
import { TFormSet } from 'types/machinery'

export const getAppName = (): string | undefined => process.env.REACT_APP_WEBSITE_NAME
export const getServerURL = (): string | undefined => process.env.REACT_APP_SERVER_URL

/**
 * Check if the current token is valid
 */
export const isAuthenticated = (): boolean => {
    const authTokenExists = !!Cookies.get('authToken')
    const dateNow = moment()
    const authExpiration = moment(Number(Cookies.get('tokenExpiration')))

    if (authExpiration.isValid() && authTokenExists) {
        return authExpiration > dateNow
    }

    if (authExpiration.isValid()) {
        console.error('Auth token expiration invalid')
    }

    return false
}

export const cleanUserSession = (): void => {
    Cookies.remove('authToken')
    Cookies.remove('tokenExpiration')
    Cookies.remove('user')
}

export const assetUpload = async (asset: File): Promise<TAsset[] | undefined> => {
    try {
        const formData = new FormData()
        formData.append('files', asset)

        const response = await HTTPClient.post<FormData, AxiosResponse<TAsset[] | undefined>>(
            API_ROUTES.ASSETS.ROOT,
            formData,
        )
        return response.data
    } catch (error) {
        console.error(error)
        return undefined
    }
}

export const getAssetPath = (relativePath?: string): string => {
    return relativePath ? `${getServerURL()}${relativePath}` : ''
}

export const getRouteWithParams = (
    route: string,
    params: Array<{ key: string; value: string | number }>,
): string => {
    let cleanedRoute = route.replace(/:/g, '')

    params.forEach((param) => {
        cleanedRoute = cleanedRoute.replace(param.key, param.value.toString())
    })

    return cleanedRoute
}

/** Convert a complex FormSet structure to a plain object */
export const flattenForm = (
    formSets: TFormSet[],
): { [key: string]: string | number | undefined } => {
    return formSets
        .flatMap((formSet) => formSet.fields.map((field) => ({ [field.name]: field.value })))
        .reduce((prev, next) => ({ ...prev, ...next }))
}

export const formIsValid = (formSets: TFormSet[]): boolean => {
    const results = formSets.map((formset) =>
        formset.fields.every((field) => (field.required ? !!field.value : true)),
    )

    return results.every((r) => r)
}
