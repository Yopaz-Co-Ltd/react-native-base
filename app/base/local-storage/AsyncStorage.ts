/* eslint-disable no-empty */
import AsyncStorage from '@react-native-async-storage/async-storage'

export const getDataString = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key)
        return value
    } catch (error) {}
}

export const setDataString = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (error) {}
}

export const getDataObject = async <T>(key: string): Promise<T | undefined | null> => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            return Promise.resolve(JSON.parse(value) as T)
        } else {
            return null
        }
    } catch (error) {}
}

export const setDataObject = async (key: string, value: any) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (error) {}
}

export const removeData = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (error) {}
}

export const getAllKeys = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys()
        return keys
    } catch (error) {}
}

export const clearAllData = async () => {
    try {
        await AsyncStorage.clear()
    } catch (error) {}
}
