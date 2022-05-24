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

export {isIOS, isAndroid, isToday, formatDate}
