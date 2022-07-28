/* eslint-disable @typescript-eslint/no-empty-function */
import {decryptData, encryptData} from '@app/base/common/Utils'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface StorageType {
    getItem(key: string): Promise<string | null>
    setItem(key: string, value: unknown): Promise<boolean>
    removeItem(key: string): void
    getItemString(key: string): Promise<string | null>
    setItemString(key: string, value: string): Promise<boolean>
    clearData(): Promise<boolean>
}

export const ReduxStorage: StorageType = {
    setItem: (key, value) => {
        try {
            const jsonValue = JSON.stringify(value)
            AsyncStorage.setItem(key, encryptData(jsonValue)).catch(() => {})
            return Promise.resolve(true)
        } catch (error) {
            return Promise.resolve(false)
        }
    },
    getItem: async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(key)
            if (value !== null) {
                const dataDecrypt = decryptData(value)
                return Promise.resolve(JSON.parse(dataDecrypt))
            }
        } catch (error) {
            console.log('error', error)
        }
    },
    removeItem: key => {
        AsyncStorage.removeItem(key)
            .then(() => Promise.resolve(true))
            .catch(() => Promise.resolve(false))
    },
    setItemString: (key, value) => {
        const jsonValue = JSON.stringify(value)
        AsyncStorage.setItem(key, encryptData(jsonValue)).catch(() => {})
        return Promise.resolve(true)
    },
    getItemString: async (key: string) => {
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
    clearData: async () => {
        try {
            await AsyncStorage.clear()
            return Promise.resolve(true)
        } catch (error) {
            return Promise.resolve(false)
        }
    },
}
