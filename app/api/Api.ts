import Configs from 'react-native-config'
import axios, {AxiosError, Method} from 'axios'
import * as AxiosLogger from 'axios-logger'
import {isAndroid} from '@base/common/Utils'
import {BaseResponseModel} from '@app/api/BaseResponseModel'
import Strings from '@resources/localization/Strings'
import {LocalStorage} from '@base/local-storage/LocalStorage'

const SERVER_URL = `https://${Configs.SERVER_HOST}`
const SERVER_END_POINT = `${SERVER_URL}/api/v1`
const REQUEST_TIMEOUT = 15000

const PATHS = {
    login: '/staff/login',
    logout: '/staff/logout',
}

const ACCESS_TOKEN_KEY = 'key.access_token'

const axiosInstance = axios.create()
axiosInstance.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger)
axiosInstance.interceptors.response.use(AxiosLogger.responseLogger, e => {
    if (!axios.isAxiosError(e)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return AxiosLogger.errorLogger(e)
    }
    const error: AxiosError = e
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
    const response = await axiosInstance.request<BaseResponseModel<T>>({
        method: config.method ?? 'get',
        url: `${SERVER_END_POINT}${config.path}`,
        headers: headers,
        params: config.params,
        data: config.body,
    })
    return Promise.resolve(response?.data?.data)
}

const getHeadersWithAuthorization = async (path: string) => {
    const defaultHeader: Header = {
        Accept: '*/*',
    }
    if (path.includes(PATHS.login)) {
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
const createFormDataForFile = (fileKey: string, fileUri: string, fileType: string): FormData => {
    const data = new FormData()
    data.append(fileKey, {
        uri: isAndroid() ? fileUri : fileUri.replace('file://', ''),
        name: fileUri.split('/').pop(),
        type: `${fileType}/*`,
    })
    return data
}

const StatusCode = {
    AUTHORIZATION: 401,
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
    PATHS,
    StatusCode,
    callApi,
    saveAccessToken,
    getAccessToken,
    removeAccessToken,
    createFormDataForFile,
}
