import Configs from 'react-native-config'
import axios, {AxiosResponse, Method} from 'axios'
import * as AxiosLogger from 'axios-logger'
import {isAndroid} from '@base/common/Utils'
import {BaseResponseModel} from '@api/models/BaseResponseModel'
import Strings from '@resources/localization/Strings'
import {LocalStorage} from '@base/local-storage/LocalStorage'
import AuthPaths from '@api/paths/auth/AuthPaths'
import {store} from '@app/redux/ConfigureStore'
import {ThunkDispatch} from 'redux-thunk'
import {RootState} from '@app/redux/RootReducer'
import {AnyAction} from 'redux'
import AuthActions from '@app/redux/auth/AuthActions'

const SERVER_URL = `https://${Configs.SERVER_HOST}`
const SERVER_END_POINT = `${SERVER_URL}/api/v1`
const REQUEST_TIMEOUT = 15000
const ACCESS_TOKEN_KEY = 'key.access_token'

export interface ErrorModel {
    code?: number
    message: string
}

const axiosInstance = axios.create()
axiosInstance.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger)
axiosInstance.interceptors.response.use(AxiosLogger.responseLogger, error => {
    if (!axios.isAxiosError(error)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return AxiosLogger.errorLogger(error)
    }
    // handle case network is not available
    if (error?.response) {
        return AxiosLogger.errorLogger(error)
    }
    console.log('[Axios][Error] Network Error!')
    return Promise.reject(Strings.errorNetwork)
})

const callApi = async <T>(config: ApiConfig): Promise<T | undefined> => {
    const headers = await getHeadersWithAuthorization(config.path)
    if (config.additionalHeaders) {
        headers['Content-Type'] = config.additionalHeaders['Content-Type']
    }
    if (config.accessToken) {
        headers.Authorization = `Bearer ${config.accessToken}`
    }
    try {
        const response = await axiosInstance.request<BaseResponseModel<T>>({
            method: config.method ?? 'get',
            url: `${SERVER_END_POINT}${config.path}`,
            headers: headers,
            params: config.params,
            data: config.body,
        })
        const data = response?.data?.data
        if (data) {
            return Promise.resolve(data)
        }
        const errorModel: ErrorModel = {message: Strings.somethingWentWrong}
        return Promise.reject(errorModel)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const response = error?.response as AxiosResponse<BaseResponseModel<T>>
            const status = response?.status
            if (status === StatusCode.AUTHORIZATION) {
                await (store.dispatch as ThunkDispatch<RootState, unknown, AnyAction>)(AuthActions.logout())
                const errorModel: ErrorModel = {message: Strings.somethingWentWrong}
                return Promise.reject(errorModel)
            }
            let message: string | undefined = response?.data?.message
            const data: T | undefined = response?.data?.data
            if (status === StatusCode.VALIDATE && data) {
                message = JSON.stringify(data)
                // todo set message with specified error response from server
            }
            const errorModel: ErrorModel = {code: status, message: message ?? Strings.somethingWentWrong}
            return Promise.reject(errorModel)
        }
        const errorModel: ErrorModel = {message: Strings.somethingWentWrong}
        return Promise.reject(errorModel)
    }
}

const getHeadersWithAuthorization = async (path: string) => {
    const defaultHeader: Header = {
        Accept: '*/*',
    }
    if (path.includes(AuthPaths.login)) {
        return defaultHeader
    }
    try {
        const accessToken = (await getAccessToken()) as string
        return accessToken
            ? {
                  Authorization: `Bearer ${accessToken}`,
                  Accept: '*/*',
              }
            : defaultHeader
    } catch (e) {
        return defaultHeader
    }
}

const saveAccessToken = (accessToken: string) => LocalStorage.setItem(ACCESS_TOKEN_KEY, accessToken)

const getAccessToken = () => LocalStorage.getItem(ACCESS_TOKEN_KEY)

const removeAccessToken = () => LocalStorage.removeItem(ACCESS_TOKEN_KEY)

// after creating form data, append body to form data
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable  @typescript-eslint/no-explicit-any */
const createFormDataForFile = (fileKey: string, fileUri: string, mimeType: string, body: any): FormData => {
    const data = new FormData()
    data.append(fileKey, {
        uri: isAndroid() ? fileUri : fileUri.replace('file://', ''),
        name: fileUri.split('/').pop(),
        type: `${mimeType}`,
    })

    Object.keys(body).forEach(key => {
        if (body[key] !== undefined) {
            if (Array.isArray(body[key])) {
                const arrayValues: any[] = body[key]
                arrayValues.forEach((value: any) => {
                    data.append(`${key}[]`, value)
                })
            } else data.append(key, body[key])
        }
    })
    return data
}

const StatusCode = {
    AUTHORIZATION: 401,
    VALIDATE: 422,
}

type AdditionalHeaders = {
    'Content-Type'?: string
}

type Header = {
    Accept?: string
    Authorization?: string
    'Content-Type'?: string
}

type ApiConfig = {
    additionalHeaders?: AdditionalHeaders
    path: string
    method?: Method
    params?: unknown
    body?: unknown
    accessToken?: string
}

export default {
    SERVER_END_POINT,
    SERVER_URL,
    REQUEST_TIMEOUT,
    StatusCode,
    callApi,
    saveAccessToken,
    getAccessToken,
    removeAccessToken,
    createFormDataForFile,
}
