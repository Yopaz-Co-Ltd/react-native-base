import {decryptData, encryptData} from '@app/base/common/EncryptionUtils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Storage} from 'redux-persist/es/types'

interface StorageType extends Storage {
    setItem(key: string, value: unknown): Promise<boolean>
    getItem(key: string): Promise<unknown>
    removeItem(key: string): Promise<boolean>
    clearData(): Promise<boolean>
}

export const LocalStorage: StorageType = {
    setItem: async (key: string, value: unknown): Promise<boolean> => {
        try {
            await AsyncStorage.setItem(key, encryptData(value))
            return Promise.resolve(true)
        } catch (error) {
            return Promise.resolve(false)
        }
    },
    getItem: async (key: string): Promise<unknown> => {
        try {
            const value = await AsyncStorage.getItem(key)
            if (value) {
                return Promise.resolve(decryptData(value))
            }
            return Promise.resolve(value)
        } catch (error) {
            console.log('error', error)
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
