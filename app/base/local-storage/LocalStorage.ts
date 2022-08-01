import {decryptData, encryptData} from '@app/base/common/EncryptionUtils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Storage} from 'redux-persist/es/types'
import Constants from '@base/common/Constants'

interface StorageType extends Storage {
    setItem(key: string, value: unknown, type?: number): Promise<boolean>
    getItem(key: string, type?: number): Promise<unknown>
    removeItem(key: string): Promise<boolean>
    clearData(): Promise<boolean>
}

export const ReduxStorage: StorageType = {
    setItem: async (key: string, value: unknown, type?: number): Promise<boolean> => {
        try {
            await AsyncStorage.setItem(
                key,
                type === Constants.TYPE_DATA_STRING ? encryptData(value) : encryptData(JSON.stringify(value)),
            )
            return Promise.resolve(true)
        } catch (error) {
            return Promise.resolve(false)
        }
    },
    getItem: async (key: string, type?: number): Promise<unknown> => {
        try {
            const value = await AsyncStorage.getItem(key)
            if (value !== null) {
                return Promise.resolve(
                    type === Constants.TYPE_DATA_STRING ? decryptData(value) : JSON.parse(decryptData(value)),
                )
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
