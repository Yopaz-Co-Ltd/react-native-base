import CryptoJS from 'crypto-js'
import moment from 'moment'
import {Platform} from 'react-native'

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

const encryptData = (data: string | CryptoJS.lib.WordArray) => {
    if (typeof data === 'string') {
        const ciphertext = CryptoJS.AES.encrypt(data, 'my-key').toString()
        return ciphertext
    } else {
        const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'my-key').toString()
        return ciphertext
    }
}

const decryptData = (data: string | CryptoJS.lib.CipherParams) => {
    const bytes = CryptoJS.AES.decrypt(data, 'my-key')
    const originalData = bytes.toString(CryptoJS.enc.Utf8)
    return originalData
}
export {isIOS, isAndroid, isToday, formatDate, encryptData, decryptData}
