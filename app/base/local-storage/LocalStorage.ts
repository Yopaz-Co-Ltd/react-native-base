import {MMKV} from 'react-native-mmkv'
import Configs from 'react-native-config'
import {Storage} from 'redux-persist/es/types'

export const LocalStorage = new MMKV({
    id: 'mmkv.default',
    encryptionKey: Configs.LOCAL_STORAGE_ENCRYPTION_KEY,
})

export const ReduxStorage: Storage = {
    setItem: (key, value) => {
        if (typeof value === 'string' || typeof value === 'boolean' || typeof value === 'number') {
            LocalStorage.set(key, value)
            return Promise.resolve(true)
        }
        return Promise.resolve(false)
    },
    getItem: key => {
        const value = LocalStorage.getString(key)
        return Promise.resolve(value)
    },
    removeItem: key => {
        LocalStorage.delete(key)
        return Promise.resolve()
    },
}
