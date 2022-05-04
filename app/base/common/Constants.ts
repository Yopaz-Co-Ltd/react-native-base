import RNDeviceInfo from 'react-native-device-info'
import {isIOS} from '@base/common/Utils'

const Constants = {
    keyboardVerticalOffset: isIOS() ? (RNDeviceInfo.hasNotch() ? 24 : 0) + 64 : 0,
}
export default Constants
