import CryptoJS from 'crypto-js'
import Configs from 'react-native-config'

const encryptData = (data?: unknown): string =>
    CryptoJS.AES.encrypt(JSON.stringify(data), Configs.ENCRYPTION_SECRET_KEY).toString()

const decryptData = (data: string): unknown => {
    const decryptedText: string = CryptoJS.AES.decrypt(data, Configs.ENCRYPTION_SECRET_KEY).toString(CryptoJS.enc.Utf8)
    return decryptedText ? JSON.parse(decryptedText) : undefined
}

export {encryptData, decryptData}
