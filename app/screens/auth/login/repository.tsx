import {serverEndPoint} from '../../../configs/api'
import {callApi} from '../../../base/apiSupport'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LOCAL_USER_KEY = 'key.user'
const IS_LOGGED_IN_KEY = 'key.is_logged_in'

const login = (username: string, password: string) =>
  new Promise((resolve, reject) => {
    if (username !== 'dimakira' || password !== '1234') {
      reject('Username or password is incorrect!')
    }
    callApi({
      additionalHeaders: undefined,
      params: undefined,
      method: 'post',
      url: `${serverEndPoint}/sign_in`,
      body: {
        username: username,
        password: password,
      },
    })
      .then(async data => {
        try {
          await saveLocalUser(data)
          await saveIsLoggedIn(true)
          resolve(data)
        } catch (error) {
          reject(error)
        }
      })
      .catch(error => {
        reject(error)
      })
  })

const saveLocalUser = async (user: any) => {
  await AsyncStorage.setItem(LOCAL_USER_KEY, JSON.stringify(user))
}

const getLocalUser = async () => {
  try {
    const result = await AsyncStorage.getItem(LOCAL_USER_KEY)
    if (result) {
      return JSON.parse(result)
    }
    return {}
  } catch (error) {}
}

const saveIsLoggedIn = async (isLoggedIn: boolean) => {
  await AsyncStorage.setItem(IS_LOGGED_IN_KEY, isLoggedIn.toString())
}

const getIsLoggedIn = async () => {
  try {
    const result = await AsyncStorage.getItem(IS_LOGGED_IN_KEY)
    if (result) {
      return JSON.parse(result) ?? false
    }
    return {}
  } catch (e) {}
}

export {
  login,
  saveLocalUser,
  getLocalUser,
  saveIsLoggedIn,
  getIsLoggedIn,
  LOCAL_USER_KEY,
}
