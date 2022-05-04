import Config from 'react-native-config'
import axios, {Method} from 'axios'
import Strings from '@resources/localization/Strings'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as AxiosLogger from 'axios-logger'
import {isAndroid} from '@base/common/Utils'

const SERVER_URL = `https://${Config.SERVER_HOST}`
const SERVER_END_POINT = `${SERVER_URL}/api/v1`
const REQUEST_TIMEOUT = 15000

const PATHS = {
    login: '/staff/login',
    logout: '/staff/logout',
}

const ACCESS_TOKEN_KEY = 'key.access_token'

const axiosInstance = axios.create()
axiosInstance.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger)
axiosInstance.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger)

const callApi = (config: ApiConfig): any =>
    new Promise(async (resolve, reject) => {
        const headers = await getHeadersWithAuthorization(config.path)
        if (config.additionalHeaders) {
            headers['Content-Type'] = config.additionalHeaders['Content-Type']
        }
        if (config.accessToken) {
            headers.Authorization = `Bearer ${config.accessToken}`
        }
        axiosInstance({
            method: config.method ?? 'get',
            url: `${SERVER_END_POINT}${config.path}`,
            headers: headers,
            params: config.params,
            data: config.body,
        })
            .then(function (response) {
                resolve(response.data)
            })
            .catch(function (error) {
                reject(error?.response ? error : Strings.errorNetwork)
            })
    })

const getHeadersWithAuthorization = async (path: string): Promise<Header> => {
    const defaultHeader: Header = {
        Accept: '*/*',
    }
    if (path.includes(PATHS.login)) {
        return defaultHeader
    }
    try {
        const accessToken = await getAccessToken()
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

const saveAccessToken = async (accessToken: string) => await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken)

const getAccessToken = async () => AsyncStorage.getItem(ACCESS_TOKEN_KEY)

const removeAccessToken = async () => AsyncStorage.removeItem(ACCESS_TOKEN_KEY)

const createFormDataForFile = (fileKey: string, fileUri: string, fileType: string, body: any): FormData => {
    const data = new FormData()
    data.append(fileKey, {
        uri: isAndroid() ? fileUri : fileUri.replace('file://', ''),
        name: fileUri.split('/').pop(),
        type: `${fileType}/*`,
    })

    Object.keys(body).forEach(key => {
        if (body[key] !== undefined) {
            data.append(key, body[key])
        }
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
    params?: any
    body?: any
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
