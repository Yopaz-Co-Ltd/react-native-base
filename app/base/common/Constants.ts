import {hasNotch} from 'react-native-device-info'
import {isIOS} from '@base/common/Utils'

const Constants = {
    keyboardVerticalOffset: isIOS() ? (hasNotch() ? 24 : 0) + 64 : 0,
    TYPE_DATA_STRING: 0,
}
export default Constants
