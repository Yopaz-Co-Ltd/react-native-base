import {Platform} from 'react-native'

const oss = {
  ios: 'ios',
  android: 'android',
}

const isIOS = () => {
  return Platform.OS === oss.ios
}
const isAndroid = () => {
  return Platform.OS === oss.android
}

export {isIOS, isAndroid}
