import axios from 'axios'
import {LOCAL_USER_KEY} from '../screens/auth/login/repository'
import AsyncStorage from '@react-native-async-storage/async-storage'

const badConfigError = 'Bad Config!'

const callApi = config =>
  new Promise(async (resolve, reject) => {
    if (config === undefined) {
      reject(badConfigError)
    }
    const headers = await getHeadersWithAuthorization(config.url)
    if (config.additionalHeaders) {
      Object.keys(config.additionalHeaders).forEach(key => {
        headers[key] = config.additionalHeaders[key]
      })
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

const getHeadersWithAuthorization = async url => {
  if (!url.includes('user')) {
    return {}
  }
  try {
    const localUser = JSON.parse(await AsyncStorage.getItem(LOCAL_USER_KEY))
    return {
      Authorization: `Bearer ${localUser.token ?? localUser.user.api_token}`,
    }
  } catch (e) {
    return {}
  }
}

export {callApi}
