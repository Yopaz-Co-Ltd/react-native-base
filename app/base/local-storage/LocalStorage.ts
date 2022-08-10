import {decryptData, encryptData} from '@app/base/common/EncryptionUtils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Storage} from 'redux-persist/es/types'

interface StorageType extends Storage {
    setItem(key: string, value: unknown, isEncrypted?: boolean): Promise<boolean>

    getItem(key: string, isDecrypted?: boolean): Promise<unknown>

    removeItem(key: string): Promise<boolean>

    clearData(): Promise<boolean>
}

export const LocalStorage: StorageType = {
    setItem: async (key: string, value: unknown, isEncrypted?: boolean): Promise<boolean> => {
        try {
            await AsyncStorage.setItem(key, isEncrypted === false ? JSON.stringify(value) : encryptData(value))
            return Promise.resolve(true)
        } catch (error) {
            return Promise.resolve(false)
        }
    },
    getItem: async (key: string, isDecrypted?: boolean): Promise<unknown> => {
        try {
            const value = await AsyncStorage.getItem(key)
            if (value) {
                return Promise.resolve(isDecrypted === false ? JSON.parse(value) : decryptData(value))
            }
            return Promise.resolve(value)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    removeItem: async (key: string): Promise<boolean> => {
        try {
            await AsyncStorage.removeItem(key)
            return Promise.resolve(true)
        } catch (error) {
            return Promise.resolve(false)
        }
    },
    clearData: async (): Promise<boolean> => {
        try {
            await AsyncStorage.clear()
            return Promise.resolve(true)
        } catch (error) {
            return Promise.resolve(false)
        }
    },
}
