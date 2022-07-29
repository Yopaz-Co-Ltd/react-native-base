import CryptoJS from 'crypto-js'
import Config from 'react-native-config'

const encryptData = <T>(data: T): string => {
    return CryptoJS.AES.encrypt(
        typeof data === 'string' ? data : JSON.stringify(data),
        Config.ENCRYPTION_SECRET_KEY,
    ).toString()
}

const decryptData = (data: string): string => {
    return CryptoJS.AES.decrypt(data, Config.ENCRYPTION_SECRET_KEY).toString(CryptoJS.enc.Utf8)
}

export {encryptData, decryptData}
