/* eslint-disable @typescript-eslint/no-empty-function */
import {decryptData, encryptData} from '@app/base/common/Utils'
import {removeData} from '@base/local-storage/AsyncStorage'
import {Storage} from 'redux-persist/es/types'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const ReduxStorage: Storage = {
    setItem: (key, value) => {
        const jsonValue = JSON.stringify(value)
        AsyncStorage.setItem(key, encryptData(jsonValue)).catch(() => {})
        return Promise.resolve(true)
    },
    getItem: async key => {
        try {
            const value = await AsyncStorage.getItem(key)
            if (value) {
                const dataDecrypt = decryptData(value)
                return Promise.resolve(JSON.parse(dataDecrypt))
            }
        } catch (e) {
            console.log('error', e)
        }
    },
    removeItem: key => {
        removeData(key)
            .then(() => {
                return Promise.resolve(true)
            })
            .catch(() => {})
    },
}
