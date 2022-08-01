import Constants from '@base/common/Constants'
import CryptoJS from 'crypto-js'
import Configs from 'react-native-config'

const encryptData = <T>(data: T | string, type?: number): string => {
    return CryptoJS.AES.encrypt(
        type === Constants.TYPE_DATA_STRING ? (data as string) : JSON.stringify(data),
        Configs.ENCRYPTION_SECRET_KEY,
    ).toString()
}

const decryptData = (data: string, type?: number): unknown => {
    return type === Constants.TYPE_DATA_STRING
        ? CryptoJS.AES.decrypt(data, Configs.ENCRYPTION_SECRET_KEY).toString(CryptoJS.enc.Utf8)
        : JSON.parse(CryptoJS.AES.decrypt(data, Configs.ENCRYPTION_SECRET_KEY).toString(CryptoJS.enc.Utf8))
}

export {encryptData, decryptData}
