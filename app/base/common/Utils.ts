import moment from 'moment'
import {Platform} from 'react-native'

const isIOS = () => {
    return Platform.OS === 'ios'
}
const isAndroid = () => {
    return Platform.OS === 'android'
}

const isToday = (dateString?: string) => {
    if (dateString === undefined || dateString === null) {
        return false
    }
    return moment().isSame(dateString, 'day')
}

const formatDate = (inputDate?: string, inputFormat?: string, outPutFormat?: string) => {
    if (inputDate) {
        return moment(inputDate, inputFormat).utcOffset('+0900').format(outPutFormat)
    }
    return undefined
}

export {isIOS, isAndroid, isToday, formatDate}
