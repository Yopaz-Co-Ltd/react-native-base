import axios, {Method} from 'axios'
import {LOCAL_USER_KEY} from '@screens/auth/login/repository'
import AsyncStorage from '@react-native-async-storage/async-storage'

const badConfigError = 'Bad Config!'

export type AdditionalHeaders = {
  'Content-Type'?: string
}

export type Header = {
  Authorization?: string
  'Content-Type'?: string
}

export type CallApiConfig = {
  additionalHeaders?: AdditionalHeaders
  url: string
  method: Method
  params: any
  body: any
}

const callApi = (config: CallApiConfig) =>
  new Promise(async (resolve, reject) => {
    if (config === undefined) {
      reject(badConfigError)
    }
    const headers = await getHeadersWithAuthorization(config.url)
    if (config.additionalHeaders) {
      headers['Content-Type'] = config.additionalHeaders['Content-Type']
    }
    axios({
      method: config.method ?? 'get',
      url: config.url,
      headers: headers,
      params: config.params,
      data: config.body,
    })
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error)
      })
  })

const getHeadersWithAuthorization = async (url: string): Promise<Header> => {
  if (!url.includes('user')) {
    return {}
  }
  try {
    const getItemResult = await AsyncStorage.getItem(LOCAL_USER_KEY)
    if (getItemResult) {
      const localUser = JSON.parse(getItemResult)
      return {
        Authorization: `Bearer ${localUser.token ?? localUser.user.api_token}`,
      }
    }
    return {}
  } catch (e) {
    return {}
  }
}

export {callApi}
