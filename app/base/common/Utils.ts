import CryptoJS from 'crypto-js'
import moment from 'moment'
import {Platform} from 'react-native'
import Config from 'react-native-config'

const isIOS = (): boolean => {
    return Platform.OS === 'ios'
}
const isAndroid = (): boolean => {
    return Platform.OS === 'android'
}

const isToday = (dateString?: string): boolean => {
    if (dateString === undefined || dateString === null) {
        return false
    }
    return moment().isSame(dateString, 'day')
}

const formatDate = (inputDate?: string, inputFormat?: string, outPutFormat?: string): string | undefined => {
    if (inputDate) {
        return moment(inputDate, inputFormat).utcOffset('+0900').format(outPutFormat)
    }
    return undefined
}

const encryptData = <T>(data: T) => {
    if (typeof data === 'string') {
        const ciphertext = CryptoJS.AES.encrypt(data, Config.ENCRYPTION_SECRET_KEY).toString()
        return ciphertext
    } else {
        const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), Config.ENCRYPTION_SECRET_KEY).toString()
        return ciphertext
    }
}

const decryptData = (data: string | CryptoJS.lib.CipherParams) => {
    const bytes = CryptoJS.AES.decrypt(data, Config.ENCRYPTION_SECRET_KEY)
    const originalData = bytes.toString(CryptoJS.enc.Utf8)
    return originalData
}
export {isIOS, isAndroid, isToday, formatDate, encryptData, decryptData}
